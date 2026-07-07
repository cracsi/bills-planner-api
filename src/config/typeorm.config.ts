import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Factura } from '../facturas/entities/factura.entity';
import { Pago } from '../pagos/entities/pago.entity';
import { MetodoDePago } from '../metodos-de-pago/entities/metodo-de-pago.entity';
import { CuentaDePago } from '../cuentas-de-pago/entities/cuenta-de-pago.entity';
import { Recordatorio } from '../recordatorios/entities/recordatorio.entity';

export default registerAs(
  'typeorm',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'bills_planner',
    entities: [Usuario, Factura, Pago, MetodoDePago, CuentaDePago, Recordatorio],
    // synchronize is convenient in early development but unsafe for real data;
    // we will switch to migrations before this touches anything resembling production.
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
  }),
);