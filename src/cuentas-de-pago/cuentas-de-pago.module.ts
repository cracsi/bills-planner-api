import { Module } from '@nestjs/common';
import { CuentasDePagoService } from './cuentas-de-pago.service';
import { CuentasDePagoController } from './cuentas-de-pago.controller';

@Module({
  controllers: [CuentasDePagoController],
  providers: [CuentasDePagoService],
})
export class CuentasDePagoModule {}
