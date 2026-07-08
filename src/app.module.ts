import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { FacturasModule } from './facturas/facturas.module';
import { AuthModule } from './auth/auth.module';
import { PagosModule } from './pagos/pagos.module';
import { MetodosDePagoModule } from './metodos-de-pago/metodos-de-pago.module';
import { CuentasDePagoModule } from './cuentas-de-pago/cuentas-de-pago.module';
import { RecordatoriosModule } from './recordatorios/recordatorios.module';
import { AuthModule } from './auth/auth.module';
import typeormConfig from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>('typeorm', { infer: true }),
    }),
    UsuariosModule,
    FacturasModule,
    AuthModule,
    PagosModule,
    MetodosDePagoModule,
    CuentasDePagoModule,
    RecordatoriosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
