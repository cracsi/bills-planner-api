import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentasDePagoService } from './cuentas-de-pago.service';
import { CuentasDePagoController } from './cuentas-de-pago.controller';
import { CuentaDePago } from './entities/cuenta-de-pago.entity';
import { MetodoDePago } from '../metodos-de-pago/entities/metodo-de-pago.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CuentaDePago, MetodoDePago])],
  controllers: [CuentasDePagoController],
  providers: [CuentasDePagoService],
})
export class CuentasDePagoModule {}