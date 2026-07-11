import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Factura } from './entities/factura.entity';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturasRepository: Repository<Factura>,
  ) {}

  async create(usuarioId: string, dto: CreateFacturaDto): Promise<Factura> {
    const factura = this.facturasRepository.create({
      ...dto,
      usuarioId,
      pagado: false,
      fechaVencimiento: this.calcularProximaFecha(dto.diaVencimiento),
      fechaSuspension: this.calcularFechaSuspension(
        dto.diaVencimiento,
        dto.diaSuspension,
      ),
    });

    return this.facturasRepository.save(factura);
  }

  findAll(usuarioId: string): Promise<Factura[]> {
    return this.facturasRepository.find({ where: { usuarioId } });
  }

  async findOne(usuarioId: string, id: string): Promise<Factura> {
    const factura = await this.facturasRepository.findOne({ where: { id } });

    if (!factura) {
      throw new NotFoundException(`Factura ${id} no encontrada`);
    }
    if (factura.usuarioId !== usuarioId) {
      throw new ForbiddenException('No tienes acceso a esta factura');
    }

    return factura;
  }

  async update(
    usuarioId: string,
    id: string,
    dto: UpdateFacturaDto,
  ): Promise<Factura> {
    const factura = await this.findOne(usuarioId, id); // reuses ownership check
    Object.assign(factura, dto);

    // If the recurrence rule changed, recompute the cached dates too.
    if (dto.diaVencimiento !== undefined) {
      factura.fechaVencimiento = this.calcularProximaFecha(dto.diaVencimiento);
    }
    if (dto.diaVencimiento !== undefined || dto.diaSuspension !== undefined) {
      factura.fechaSuspension = this.calcularFechaSuspension(
        factura.diaVencimiento,
        factura.diaSuspension,
      );
    }

    return this.facturasRepository.save(factura);
  }

  async remove(usuarioId: string, id: string): Promise<void> {
    const factura = await this.findOne(usuarioId, id); // reuses ownership check
    await this.facturasRepository.remove(factura);
  }

  private calcularProximaFecha(diaVencimiento: number): string {
    const hoy = new Date();
    let mes = hoy.getMonth();
    let anio = hoy.getFullYear();

    // If this month's due day has already passed, target next month instead.
    if (hoy.getDate() > diaVencimiento) {
      mes += 1;
      if (mes > 11) {
        mes = 0;
        anio += 1;
      }
    }

    const fecha = new Date(anio, mes, diaVencimiento);
    return fecha.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  }

  private calcularFechaSuspension(
    diaVencimiento: number,
    diaSuspension: number,
  ): string {
    const vencimiento = new Date(this.calcularProximaFecha(diaVencimiento));
    vencimiento.setDate(vencimiento.getDate() + diaSuspension);
    return vencimiento.toISOString().split('T')[0];
  }
}