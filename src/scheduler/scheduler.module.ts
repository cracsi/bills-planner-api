import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';
import { Factura } from '../facturas/entities/factura.entity';
import { Recordatorio } from '../recordatorios/entities/recordatorio.entity';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Factura, Recordatorio]),
    EmailModule,
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}