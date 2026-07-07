import { Injectable } from '@nestjs/common';
import { CreateRecordatorioDto } from './dto/create-recordatorio.dto';
import { UpdateRecordatorioDto } from './dto/update-recordatorio.dto';

@Injectable()
export class RecordatoriosService {
  create(createRecordatorioDto: CreateRecordatorioDto) {
    return 'This action adds a new recordatorio';
  }

  findAll() {
    return `This action returns all recordatorios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recordatorio`;
  }

  update(id: number, updateRecordatorioDto: UpdateRecordatorioDto) {
    return `This action updates a #${id} recordatorio`;
  }

  remove(id: number) {
    return `This action removes a #${id} recordatorio`;
  }
}
