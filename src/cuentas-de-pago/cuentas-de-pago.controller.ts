import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CuentasDePagoService } from './cuentas-de-pago.service';
import { CreateCuentaDePagoDto } from './dto/create-cuentas-de-pago.dto';
import { UpdateCuentaDePagoDto } from './dto/update-cuentas-de-pago.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

interface UsuarioActual {
  id: string;
  nombre: string;
  email: string;
}

@Controller('cuentas-de-pago')
@UseGuards(JwtAuthGuard)
export class CuentasDePagoController {
  constructor(private readonly cuentasDePagoService: CuentasDePagoService) {}

  @Post()
  create(
    @CurrentUser() usuario: UsuarioActual,
    @Body() dto: CreateCuentaDePagoDto,
  ) {
    return this.cuentasDePagoService.create(usuario.id, dto);
  }

  @Get()
  findAll(@CurrentUser() usuario: UsuarioActual) {
    return this.cuentasDePagoService.findAll(usuario.id);
  }

  @Get(':id')
  findOne(@CurrentUser() usuario: UsuarioActual, @Param('id') id: string) {
    return this.cuentasDePagoService.findOne(usuario.id, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() usuario: UsuarioActual,
    @Param('id') id: string,
    @Body() dto: UpdateCuentaDePagoDto,
  ) {
    return this.cuentasDePagoService.update(usuario.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() usuario: UsuarioActual, @Param('id') id: string) {
    return this.cuentasDePagoService.remove(usuario.id, id);
  }
}