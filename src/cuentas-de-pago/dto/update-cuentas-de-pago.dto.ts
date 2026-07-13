import { PartialType } from '@nestjs/mapped-types';
import { CreateCuentaDePagoDto } from './create-cuenta-de-pago.dto';

export class UpdateCuentaDePagoDto extends PartialType(CreateCuentaDePagoDto) {}