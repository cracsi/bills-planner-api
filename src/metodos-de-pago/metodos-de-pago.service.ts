import { Injectable } from '@nestjs/common';
import { CreateMetodosDePagoDto } from './dto/create-metodos-de-pago.dto';
import { UpdateMetodosDePagoDto } from './dto/update-metodos-de-pago.dto';

@Injectable()
export class MetodosDePagoService {
  create(createMetodosDePagoDto: CreateMetodosDePagoDto) {
    return 'This action adds a new metodosDePago';
  }

  findAll() {
    return `This action returns all metodosDePago`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metodosDePago`;
  }

  update(id: number, updateMetodosDePagoDto: UpdateMetodosDePagoDto) {
    return `This action updates a #${id} metodosDePago`;
  }

  remove(id: number) {
    return `This action removes a #${id} metodosDePago`;
  }
}
