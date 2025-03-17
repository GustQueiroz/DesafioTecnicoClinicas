/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';
import { ProfessionalResolver } from './professional.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProfessionalController],
  providers: [ProfessionalService, ProfessionalResolver],
  exports: [ProfessionalService],
})
export class ProfessionalModule {}
