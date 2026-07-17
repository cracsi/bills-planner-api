import { PartialType } from '@nestjs/mapped-types';
import { CreateCuentaDePagoDto } from './create-cuentas-de-pago.dto';

export class UpdateCuentaDePagoDto extends PartialType(CreateCuentaDePagoDto) {}