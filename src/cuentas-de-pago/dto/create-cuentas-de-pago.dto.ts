export class CreateCuentasDePagoDto {}
import { IsString } from 'class-validator';

export class CreateCuentaDePagoDto {
  @IsString()
  metodoPagoId!: string;

  @IsString()
  alias!: string;

  @IsString()
  datos!: string;
}