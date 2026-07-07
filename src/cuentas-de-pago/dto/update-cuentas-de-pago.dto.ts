import { PartialType } from '@nestjs/mapped-types';
import { CreateCuentasDePagoDto } from './create-cuentas-de-pago.dto';

export class UpdateCuentasDePagoDto extends PartialType(CreateCuentasDePagoDto) {}
