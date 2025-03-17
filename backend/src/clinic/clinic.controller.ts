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
import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('clinics')
@ApiBearerAuth()
@Controller('api/clinics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Criar uma nova clínica' })
  @ApiResponse({
    status: 201,
    description: 'Clínica criada com sucesso',
    type: CreateClinicDto,
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 403, description: 'Acesso proibido' })
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicService.create(createClinicDto);
  }

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Listar todas as clínicas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clínicas retornada com sucesso',
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  findAll() {
    return this.clinicService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Obter uma clínica por ID' })
  @ApiParam({ name: 'id', description: 'ID da clínica' })
  @ApiResponse({
    status: 200,
    description: 'Clínica encontrada com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Clínica não encontrada' })
  findOne(@Param('id') id: string) {
    return this.clinicService.findOne(+id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Atualizar uma clínica' })
  @ApiParam({ name: 'id', description: 'ID da clínica' })
  @ApiResponse({
    status: 200,
    description: 'Clínica atualizada com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Clínica não encontrada' })
  update(@Param('id') id: string, @Body() updateClinicDto: UpdateClinicDto) {
    return this.clinicService.update(+id, updateClinicDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Excluir uma clínica' })
  @ApiParam({ name: 'id', description: 'ID da clínica' })
  @ApiResponse({
    status: 200,
    description: 'Clínica excluída com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  @ApiResponse({ status: 404, description: 'Clínica não encontrada' })
  remove(@Param('id') id: string) {
    return this.clinicService.remove(+id);
  }
}
