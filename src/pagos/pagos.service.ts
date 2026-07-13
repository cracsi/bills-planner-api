import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pago } from './entities/pago.entity';
import { Factura } from '../facturas/entities/factura.entity';
import { CuentaDePago } from '../cuentas-de-pago/entities/cuenta-de-pago.entity';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';

@Injectable()
export class PagosService {
  constructor(
    @InjectRepository(Pago)
    private readonly pagosRepository: Repository<Pago>,
    @InjectRepository(Factura)
    private readonly facturasRepository: Repository<Factura>,
    @InjectRepository(CuentaDePago)
    private readonly cuentasDePagoRepository: Repository<CuentaDePago>,
  ) {}

  async create(usuarioId: string, dto: CreatePagoDto): Promise<Pago> {
    await this.verificarFacturaPropia(usuarioId, dto.facturaId);
    await this.verificarCuentaPropia(usuarioId, dto.cuentaDePagoId);

    const pago = this.pagosRepository.create(dto);
    const guardado = await this.pagosRepository.save(pago);

    // A payment was just logged — mark the bill paid for this cycle.
    await this.facturasRepository.update(dto.facturaId, { pagado: true });

    return guardado;
  }

  async findAllByFactura(usuarioId: string, facturaId: string): Promise<Pago[]> {
    await this.verificarFacturaPropia(usuarioId, facturaId);
    return this.pagosRepository.find({ where: { facturaId } });
  }

  async findOne(usuarioId: string, id: string): Promise<Pago> {
    const pago = await this.pagosRepository.findOne({ where: { id } });
    if (!pago) {
      throw new NotFoundException(`Pago ${id} no encontrado`);
    }
    await this.verificarFacturaPropia(usuarioId, pago.facturaId);
    return pago;
  }

  async update(usuarioId: string, id: string, dto: UpdatePagoDto): Promise<Pago> {
    const pago = await this.findOne(usuarioId, id); // reuses ownership check
    Object.assign(pago, dto);
    return this.pagosRepository.save(pago);
  }

  async remove(usuarioId: string, id: string): Promise<void> {
    const pago = await this.findOne(usuarioId, id); // reuses ownership check
    await this.pagosRepository.remove(pago);
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

  private async verificarCuentaPropia(
    usuarioId: string,
    cuentaDePagoId: string,
  ): Promise<void> {
    const cuenta = await this.cuentasDePagoRepository.findOne({
      where: { id: cuentaDePagoId },
    });
    if (!cuenta) {
      throw new NotFoundException(`Cuenta de pago ${cuentaDePagoId} no encontrada`);
    }
    if (cuenta.usuarioId !== usuarioId) {
      throw new ForbiddenException('No tienes acceso a esta cuenta de pago');
    }
  }
}