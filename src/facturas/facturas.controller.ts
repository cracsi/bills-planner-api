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
import { FacturasService } from './facturas.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

interface UsuarioActual {
  id: string;
  nombre: string;
  email: string;
}

@Controller('facturas')
@UseGuards(JwtAuthGuard)
export class FacturasController {
  constructor(private readonly facturasService: FacturasService) {}

  @Post()
  create(
    @CurrentUser() usuario: UsuarioActual,
    @Body() createFacturaDto: CreateFacturaDto,
  ) {
    return this.facturasService.create(usuario.id, createFacturaDto);
  }

  @Get()
  findAll(@CurrentUser() usuario: UsuarioActual) {
    return this.facturasService.findAll(usuario.id);
  }

  @Get(':id')
  findOne(@CurrentUser() usuario: UsuarioActual, @Param('id') id: string) {
    return this.facturasService.findOne(usuario.id, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() usuario: UsuarioActual,
    @Param('id') id: string,
    @Body() updateFacturaDto: UpdateFacturaDto,
  ) {
    return this.facturasService.update(usuario.id, id, updateFacturaDto);
  }

  @Delete(':id')
  remove(@CurrentUser() usuario: UsuarioActual, @Param('id') id: string) {
    return this.facturasService.remove(usuario.id, id);
  }
}