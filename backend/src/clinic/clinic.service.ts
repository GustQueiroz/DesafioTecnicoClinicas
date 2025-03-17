/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';

@Injectable()
export class ClinicService {
  constructor(private prisma: PrismaService) {}

  async create(createClinicDto: CreateClinicDto) {
    return this.prisma.clinic.create({
      data: createClinicDto,
    });
  }

  async findAll() {
    return this.prisma.clinic.findMany({
      include: {
        professionals: true,
        schedules: true,
      },
    });
  }

  async findOne(id: number) {
    const clinic = await this.prisma.clinic.findUnique({
      where: { id },
      include: {
        professionals: true,
        schedules: true,
      },
    });

    if (!clinic) {
      throw new NotFoundException(`Clinic with ID ${id} not found`);
    }

    return clinic;
  }

  async update(id: number, updateClinicDto: UpdateClinicDto) {
    try {
      return await this.prisma.clinic.update({
        where: { id },
        data: updateClinicDto,
        include: {
          professionals: true,
          schedules: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Clinic with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    const professionalsCount = await this.prisma.professional.count({
      where: { clinicId: id },
    });

    if (professionalsCount > 0) {
      throw new Error(
        `Cannot delete clinic with ID ${id} because it has professionals`,
      );
    }

    try {
      return await this.prisma.clinic.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Clinic with ID ${id} not found`);
    }
  }
}
