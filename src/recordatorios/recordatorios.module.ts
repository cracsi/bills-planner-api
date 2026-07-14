import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordatoriosService } from './recordatorios.service';
import { RecordatoriosController } from './recordatorios.controller';
import { Recordatorio } from './entities/recordatorio.entity';
import { Factura } from '../facturas/entities/factura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recordatorio, Factura])],
  controllers: [RecordatoriosController],
  providers: [RecordatoriosService],
})
export class RecordatoriosModule {}