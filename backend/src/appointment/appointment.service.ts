/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id: createAppointmentDto.scheduleId },
      include: { appointments: true },
    });

    if (!schedule) {
      throw new BadRequestException(
        `Schedule with ID ${createAppointmentDto.scheduleId} not found`,
      );
    }

    const patient = await this.prisma.patient.findUnique({
      where: { id: createAppointmentDto.patientId },
    });

    if (!patient) {
      throw new BadRequestException(
        `Patient with ID ${createAppointmentDto.patientId} not found`,
      );
    }

    if (schedule.appointments.length > 0) {
      throw new BadRequestException('This time slot is already booked');
    }

    const patientAppointmentsSameDay = await this.prisma.appointment.findMany({
      where: {
        patientId: createAppointmentDto.patientId,
        date: {
          equals: createAppointmentDto.date,
        },
      },
    });

    if (patientAppointmentsSameDay.length > 0) {
      throw new BadRequestException(
        'Patient already has an appointment for this day',
      );
    }

    return this.prisma.appointment.create({
      data: createAppointmentDto,
      include: {
        patient: true,
        schedule: {
          include: {
            professional: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.appointment.findMany({
      include: {
        patient: true,
        schedule: {
          include: {
            professional: true,
          },
        },
      },
    });
  }

  async findByPatientCpf(cpf: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { cpf },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with CPF ${cpf} not found`);
    }

    return this.prisma.appointment.findMany({
      where: { patientId: patient.id },
      include: {
        schedule: {
          include: {
            professional: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
        schedule: {
          include: {
            professional: true,
          },
        },
      },
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      return await this.prisma.appointment.update({
        where: { id },
        data: updateAppointmentDto,
        include: {
          patient: true,
          schedule: {
            include: {
              professional: true,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  }

  async cancel(id: number) {
    try {
      return await this.prisma.appointment.update({
        where: { id },
        data: { status: 'CANCELLED' },
      });
    } catch (error) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  }
}
