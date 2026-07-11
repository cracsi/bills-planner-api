import { IsString, IsNumber, IsInt, IsOptional, Min, Max } from 'class-validator';

export class CreateFacturaDto {
  @IsString()
  nombre!: string;

  @IsNumber()
  @Min(0)
  valor!: number;

  @IsOptional()
  @IsString()
  descripción?: string;

  @IsOptional()
  @IsString()
  linkPago?: string;

  @IsOptional()
  @IsString()
  instruccionesPago?: string;

  @IsInt()
  @Min(1)
  @Max(31)
  diaVencimiento!: number;

  @IsInt()
  @Min(0)
  diaSuspension!: number;
}