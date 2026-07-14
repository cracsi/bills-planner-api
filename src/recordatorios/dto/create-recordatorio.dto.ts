import { IsString, IsInt, Min } from 'class-validator';

export class CreateRecordatorioDto {
  @IsString()
  facturaId!: string;

  @IsInt()
  @Min(0)
  diasAntes!: number;

  @IsString()
  mensaje!: string;
}