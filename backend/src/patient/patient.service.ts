/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    const existingPatient = await this.prisma.patient.findUnique({
      where: { cpf: createPatientDto.cpf },
    });

    if (existingPatient) {
      throw new BadRequestException(
        `Patient with CPF ${createPatientDto.cpf} already exists`,
      );
    }

    return this.prisma.patient.create({
      data: createPatientDto,
    });
  }

  async findAll() {
    return this.prisma.patient.findMany({
      include: {
        appointments: true,
      },
    });
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: true,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async findByCpf(cpf: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { cpf },
      include: {
        appointments: true,
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with CPF ${cpf} not found`);
    }

    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    if (updatePatientDto.cpf) {
      const existingPatient = await this.prisma.patient.findUnique({
        where: { cpf: updatePatientDto.cpf },
      });

      if (existingPatient && existingPatient.id !== id) {
        throw new BadRequestException(
          `Patient with CPF ${updatePatientDto.cpf} already exists`,
        );
      }
    }

    try {
      return await this.prisma.patient.update({
        where: { id },
        data: updatePatientDto,
        include: {
          appointments: true,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    const appointmentsCount = await this.prisma.appointment.count({
      where: { patientId: id },
    });

    if (appointmentsCount > 0) {
      throw new BadRequestException(
        `Cannot delete patient with ID ${id} because it has appointments`,
      );
    }

    try {
      return await this.prisma.patient.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
  }
}
