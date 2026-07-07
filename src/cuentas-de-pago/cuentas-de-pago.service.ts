import { Injectable } from '@nestjs/common';
import { CreateCuentasDePagoDto } from './dto/create-cuentas-de-pago.dto';
import { UpdateCuentasDePagoDto } from './dto/update-cuentas-de-pago.dto';

@Injectable()
export class CuentasDePagoService {
  create(createCuentasDePagoDto: CreateCuentasDePagoDto) {
    return 'This action adds a new cuentasDePago';
  }

  findAll() {
    return `This action returns all cuentasDePago`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cuentasDePago`;
  }

  update(id: number, updateCuentasDePagoDto: UpdateCuentasDePagoDto) {
    return `This action updates a #${id} cuentasDePago`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuentasDePago`;
  }
}
