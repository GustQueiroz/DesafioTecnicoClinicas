/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const professional = await this.prisma.professional.findUnique({
      where: { id: createScheduleDto.professionalId },
    });

    if (!professional) {
      throw new BadRequestException(
        `Professional with ID ${createScheduleDto.professionalId} not found`,
      );
    }

    const existingSchedule = await this.prisma.schedule.findFirst({
      where: {
        professionalId: createScheduleDto.professionalId,
        date: createScheduleDto.date,
        time: createScheduleDto.time,
      },
    });

    if (existingSchedule) {
      throw new BadRequestException(
        'This time slot is already scheduled for this professional',
      );
    }

    return this.prisma.schedule.create({
      data: createScheduleDto,
    });
  }

  async findAll() {
    return this.prisma.schedule.findMany({
      include: {
        professional: true,
        appointments: true,
      },
    });
  }

  async findByClinic(clinicId: number) {
    return this.prisma.schedule.findMany({
      where: {
        professional: {
          clinicId: clinicId,
        },
      },
      include: {
        professional: true,
        appointments: true,
      },
    });
  }

  async findByProfessional(professionalId: number) {
    return this.prisma.schedule.findMany({
      where: {
        professionalId: professionalId,
      },
      include: {
        professional: true,
        appointments: true,
      },
    });
  }

  async findOne(id: number) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
      include: {
        professional: true,
        appointments: true,
      },
    });

    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }

    return schedule;
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    try {
      return await this.prisma.schedule.update({
        where: { id },
        data: updateScheduleDto,
        include: {
          professional: true,
          appointments: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    const appointmentsCount = await this.prisma.appointment.count({
      where: { scheduleId: id },
    });

    if (appointmentsCount > 0) {
      throw new BadRequestException(
        `Cannot delete schedule with ID ${id} because it has appointments`,
      );
    }

    try {
      return await this.prisma.schedule.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
  }
}
