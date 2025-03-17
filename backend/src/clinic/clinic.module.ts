import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { ClinicResolver } from './clinic.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ClinicController],
  providers: [ClinicService, ClinicResolver],
  exports: [ClinicService],
})
export class ClinicModule {}
