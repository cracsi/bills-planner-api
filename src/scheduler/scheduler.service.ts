import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { Factura } from '../facturas/entities/factura.entity';
import { Recordatorio } from '../recordatorios/entities/recordatorio.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(
    @InjectRepository(Factura)
    private readonly facturasRepository: Repository<Factura>,
    @InjectRepository(Recordatorio)
    private readonly recordatoriosRepository: Repository<Recordatorio>,
    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async ejecutarTareasDiarias(): Promise<void> {
    this.logger.log('Iniciando tareas programadas diarias...');
    await this.actualizarCiclosVencidos();
    await this.enviarRecordatoriosPendientes();
    this.logger.log('Tareas programadas completadas.');
  }

  private async actualizarCiclosVencidos(): Promise<void> {
    const hoy = this.hoyComoFecha();

    const facturasVencidas = await this.facturasRepository.find({
      where: { fechaVencimiento: LessThan(hoy) },
    });

    for (const factura of facturasVencidas) {
      const nuevaFechaVencimiento = this.sumarUnMes(factura.fechaVencimiento);
      const nuevaFechaSuspension = this.sumarDias(
        nuevaFechaVencimiento,
        factura.diaSuspension,
      );

      factura.fechaVencimiento = nuevaFechaVencimiento;
      factura.fechaSuspension = nuevaFechaSuspension;
      factura.pagado = false;

      await this.facturasRepository.save(factura);
      this.logger.log(`Factura ${factura.id} actualizada al nuevo ciclo.`);
    }
  }

  private async enviarRecordatoriosPendientes(): Promise<void> {
    const hoy = this.hoyComoFecha();

    const facturasActivas = await this.facturasRepository.find({
      where: { pagado: false },
      relations: {
    usuario: true,
    recordatorios: true,
  },
    });

    for (const factura of facturasActivas) {
      for (const recordatorio of factura.recordatorios) {
        const fechaRecordatorio = this.restarDias(
          factura.fechaVencimiento,
          recordatorio.diasAntes,
        );

        if (fechaRecordatorio === hoy) {
          await this.emailService.enviarRecordatorio(
            factura.usuario.email,
            recordatorio.mensaje,
          );
          this.logger.log(
            `Recordatorio enviado para factura ${factura.id} a ${factura.usuario.email}`,
          );
        }
      }
    }
  }

  private hoyComoFecha(): string {
    return new Date().toISOString().split('T')[0];
  }

  private sumarUnMes(fecha: string): string {
    const date = new Date(fecha);
    date.setMonth(date.getMonth() + 1);
    return date.toISOString().split('T')[0];
  }

  private sumarDias(fecha: string, dias: number): string {
    const date = new Date(fecha);
    date.setDate(date.getDate() + dias);
    return date.toISOString().split('T')[0];
  }

  private restarDias(fecha: string, dias: number): string {
    const date = new Date(fecha);
    date.setDate(date.getDate() - dias);
    return date.toISOString().split('T')[0];
  }
}