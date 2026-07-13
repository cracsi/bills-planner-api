import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { Pago } from './entities/pago.entity';
import { Factura } from '../facturas/entities/factura.entity';
import { CuentaDePago } from '../cuentas-de-pago/entities/cuenta-de-pago.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pago, Factura, CuentaDePago]),
  ],
  controllers: [PagosController],
  providers: [PagosService],
})
export class PagosModule {}