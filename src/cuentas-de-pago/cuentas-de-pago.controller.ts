import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuentasDePagoService } from './cuentas-de-pago.service';
import { CreateCuentasDePagoDto } from './dto/create-cuentas-de-pago.dto';
import { UpdateCuentasDePagoDto } from './dto/update-cuentas-de-pago.dto';

@Controller('cuentas-de-pago')
export class CuentasDePagoController {
  constructor(private readonly cuentasDePagoService: CuentasDePagoService) {}

  @Post()
  create(@Body() createCuentasDePagoDto: CreateCuentasDePagoDto) {
    return this.cuentasDePagoService.create(createCuentasDePagoDto);
  }

  @Get()
  findAll() {
    return this.cuentasDePagoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentasDePagoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuentasDePagoDto: UpdateCuentasDePagoDto) {
    return this.cuentasDePagoService.update(+id, updateCuentasDePagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuentasDePagoService.remove(+id);
  }
}
