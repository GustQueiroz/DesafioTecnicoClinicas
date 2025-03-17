/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, password: string) {
    const adminUsers = {
      admin: {
        password: await bcrypt.hash('admin123', 10),
        role: 'ADMIN',
      },
    };

    const user = adminUsers[username];
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { username, sub: username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validatePatientByCPF(cpf: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { cpf },
    });

    if (!patient) {
      throw new UnauthorizedException('CPF inválido');
    }

    return patient;
  }
}
