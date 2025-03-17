/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class PatientCpfGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const cpf = request.headers['x-patient-cpf'];

    if (!cpf) {
      throw new UnauthorizedException('CPF não fornecido');
    }

    try {
      const patient = await this.authService.validatePatientByCPF(cpf);
      request.patient = patient;
      return true;
    } catch (error) {
      throw new UnauthorizedException('CPF inválido ou não registrado');
    }
  }
}
