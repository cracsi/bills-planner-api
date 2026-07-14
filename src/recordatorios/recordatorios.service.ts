import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recordatorio } from './entities/recordatorio.entity';
import { Factura } from '../facturas/entities/factura.entity';
import { CreateRecordatorioDto } from './dto/create-recordatorio.dto';
import { UpdateRecordatorioDto } from './dto/update-recordatorio.dto';

@Injectable()
export class RecordatoriosService {
  constructor(
    @InjectRepository(Recordatorio)
    private readonly recordatoriosRepository: Repository<Recordatorio>,
    @InjectRepository(Factura)
    private readonly facturasRepository: Repository<Factura>,
  ) {}

  async create(
    usuarioId: string,
    dto: CreateRecordatorioDto,
  ): Promise<Recordatorio> {
    await this.verificarFacturaPropia(usuarioId, dto.facturaId);

    const recordatorio = this.recordatoriosRepository.create(dto);
    return this.recordatoriosRepository.save(recordatorio);
  }

  async findAllByFactura(
    usuarioId: string,
    facturaId: string,
  ): Promise<Recordatorio[]> {
    await this.verificarFacturaPropia(usuarioId, facturaId);
    return this.recordatoriosRepository.find({ where: { facturaId } });
  }

  async findOne(usuarioId: string, id: string): Promise<Recordatorio> {
    const recordatorio = await this.recordatoriosRepository.findOne({
      where: { id },
    });
    if (!recordatorio) {
      throw new NotFoundException(`Recordatorio ${id} no encontrado`);
    }
    await this.verificarFacturaPropia(usuarioId, recordatorio.facturaId);
    return recordatorio;
  }

  async update(
    usuarioId: string,
    id: string,
    dto: UpdateRecordatorioDto,
  ): Promise<Recordatorio> {
    const recordatorio = await this.findOne(usuarioId, id); // reuses ownership check
    Object.assign(recordatorio, dto);
    return this.recordatoriosRepository.save(recordatorio);
  }

  async remove(usuarioId: string, id: string): Promise<void> {
    const recordatorio = await this.findOne(usuarioId, id); // reuses ownership check
    await this.recordatoriosRepository.remove(recordatorio);
  }

  private async verificarFacturaPropia(
    usuarioId: string,
    facturaId: string,
  ): Promise<void> {
    const factura = await this.facturasRepository.findOne({
      where: { id: facturaId },
    });
    if (!factura) {
      throw new NotFoundException(`Factura ${facturaId} no encontrada`);
    }
    if (factura.usuarioId !== usuarioId) {
      throw new ForbiddenException('No tienes acceso a esta factura');
    }
  }
}