import { Module } from '@nestjs/common';
import { MetodosDePagoService } from './metodos-de-pago.service';
import { MetodosDePagoController } from './metodos-de-pago.controller';

@Module({
  controllers: [MetodosDePagoController],
  providers: [MetodosDePagoService],
})
export class MetodosDePagoModule {}
