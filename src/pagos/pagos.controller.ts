import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

interface UsuarioActual {
  id: string;
  nombre: string;
  email: string;
}

@Controller('pagos')
@UseGuards(JwtAuthGuard)
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post()
  create(@CurrentUser() usuario: UsuarioActual, @Body() dto: CreatePagoDto) {
    return this.pagosService.create(usuario.id, dto);
  }

  @Get()
  findAllByFactura(
    @CurrentUser() usuario: UsuarioActual,
    @Query('facturaId') facturaId: string,
  ) {
    return this.pagosService.findAllByFactura(usuario.id, facturaId);
  }

  @Get(':id')
  findOne(@CurrentUser() usuario: UsuarioActual, @Param('id') id: string) {
    return this.pagosService.findOne(usuario.id, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() usuario: UsuarioActual,
    @Param('id') id: string,
    @Body() dto: UpdatePagoDto,
  ) {
    return this.pagosService.update(usuario.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() usuario: UsuarioActual, @Param('id') id: string) {
    return this.pagosService.remove(usuario.id, id);
  }
}