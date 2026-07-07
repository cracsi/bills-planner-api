import { PartialType } from '@nestjs/mapped-types';
import { CreateMetodosDePagoDto } from './create-metodos-de-pago.dto';

export class UpdateMetodosDePagoDto extends PartialType(CreateMetodosDePagoDto) {}
