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
import { RecordatoriosService } from './recordatorios.service';
import { CreateRecordatorioDto } from './dto/create-recordatorio.dto';
import { UpdateRecordatorioDto } from './dto/update-recordatorio.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

interface UsuarioActual {
  id: string;
  nombre: string;
  email: string;
}

@Controller('recordatorios')
@UseGuards(JwtAuthGuard)
export class RecordatoriosController {
  constructor(private readonly recordatoriosService: RecordatoriosService) {}

  @Post()
  create(
    @CurrentUser() usuario: UsuarioActual,
    @Body() dto: CreateRecordatorioDto,
  ) {
    return this.recordatoriosService.create(usuario.id, dto);
  }

  @Get()
  findAllByFactura(
    @CurrentUser() usuario: UsuarioActual,
    @Query('facturaId') facturaId: string,
  ) {
    return this.recordatoriosService.findAllByFactura(usuario.id, facturaId);
  }

  @Get(':id')
  findOne(@CurrentUser() usuario: UsuarioActual, @Param('id') id: string) {
    return this.recordatoriosService.findOne(usuario.id, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() usuario: UsuarioActual,
    @Param('id') id: string,
    @Body() dto: UpdateRecordatorioDto,
  ) {
    return this.recordatoriosService.update(usuario.id, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() usuario: UsuarioActual, @Param('id') id: string) {
    return this.recordatoriosService.remove(usuario.id, id);
  }
}
