import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CuentaDePago } from './entities/cuenta-de-pago.entity';
import { MetodoDePago } from '../metodos-de-pago/entities/metodo-de-pago.entity';
import { CreateCuentaDePagoDto } from './dto/create-cuentas-de-pago.dto';
import { UpdateCuentaDePagoDto } from './dto/update-cuentas-de-pago.dto';

@Injectable()
export class CuentasDePagoService {
  constructor(
    @InjectRepository(CuentaDePago)
    private readonly cuentasDePagoRepository: Repository<CuentaDePago>,
    @InjectRepository(MetodoDePago)
    private readonly metodosDePagoRepository: Repository<MetodoDePago>,
  ) {}

  async create(
    usuarioId: string,
    dto: CreateCuentaDePagoDto,
  ): Promise<CuentaDePago> {
    const metodo = await this.metodosDePagoRepository.findOne({
      where: { id: dto.metodoPagoId },
    });
    if (!metodo) {
      throw new NotFoundException(
        `Método de pago ${dto.metodoPagoId} no encontrado`,
      );
    }

    const cuenta = this.cuentasDePagoRepository.create({ ...dto, usuarioId });
    return this.cuentasDePagoRepository.save(cuenta);
  }

  findAll(usuarioId: string): Promise<CuentaDePago[]> {
    return this.cuentasDePagoRepository.find({ where: { usuarioId } });
  }

  async findOne(usuarioId: string, id: string): Promise<CuentaDePago> {
    const cuenta = await this.cuentasDePagoRepository.findOne({ where: { id } });
    if (!cuenta) {
      throw new NotFoundException(`Cuenta de pago ${id} no encontrada`);
    }
    if (cuenta.usuarioId !== usuarioId) {
      throw new ForbiddenException('No tienes acceso a esta cuenta de pago');
    }
    return cuenta;
  }

  async update(
    usuarioId: string,
    id: string,
    dto: UpdateCuentaDePagoDto,
  ): Promise<CuentaDePago> {
    const cuenta = await this.findOne(usuarioId, id); // reuses ownership check

    if (dto.metodoPagoId) {
      const metodo = await this.metodosDePagoRepository.findOne({
        where: { id: dto.metodoPagoId },
      });
      if (!metodo) {
        throw new NotFoundException(
          `Método de pago ${dto.metodoPagoId} no encontrado`,
        );
      }
    }

    Object.assign(cuenta, dto);
    return this.cuentasDePagoRepository.save(cuenta);
  }

  async remove(usuarioId: string, id: string): Promise<void> {
    const cuenta = await this.findOne(usuarioId, id); // reuses ownership check
    await this.cuentasDePagoRepository.remove(cuenta);
  }
}