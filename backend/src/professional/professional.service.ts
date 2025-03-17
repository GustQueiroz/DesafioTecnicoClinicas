/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';

@Injectable()
export class ProfessionalService {
  constructor(private prisma: PrismaService) {}

  async create(createProfessionalDto: CreateProfessionalDto) {
    const clinic = await this.prisma.clinic.findUnique({
      where: { id: createProfessionalDto.clinicId },
    });

    if (!clinic) {
      throw new NotFoundException(
        `Clinic with ID ${createProfessionalDto.clinicId} not found`,
      );
    }

    return this.prisma.professional.create({
      data: createProfessionalDto,
    });
  }

  async findAllByClinic(clinicId: number) {
    return this.prisma.professional.findMany({
      where: { clinicId },
      include: {
        clinic: true,
        schedules: true,
      },
    });
  }

  async findOne(id: number) {
    const professional = await this.prisma.professional.findUnique({
      where: { id },
      include: {
        clinic: true,
        schedules: true,
      },
    });

    if (!professional) {
      throw new NotFoundException(`Professional with ID ${id} not found`);
    }

    return professional;
  }

  async update(id: number, updateProfessionalDto: UpdateProfessionalDto) {
    try {
      return await this.prisma.professional.update({
        where: { id },
        data: updateProfessionalDto,
        include: {
          clinic: true,
          schedules: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Professional with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    const schedulesCount = await this.prisma.schedule.count({
      where: { professionalId: id },
    });

    if (schedulesCount > 0) {
      throw new Error(
        `Cannot delete professional with ID ${id} because it has schedules`,
      );
    }

    try {
      return await this.prisma.professional.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Professional with ID ${id} not found`);
    }
  }
}
