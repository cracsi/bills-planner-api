import { IsString, IsNumber, IsDateString, Min } from 'class-validator';

export class CreatePagoDto {
  @IsString()
  facturaId!: string;

  @IsString()
  cuentaDePagoId!: string;

  @IsNumber()
  @Min(0)
  valor!: number;

  @IsDateString()
  fecha!: string;
}