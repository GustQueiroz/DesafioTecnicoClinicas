/* eslint-disable prettier/prettier */

import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { CpfValidator } from '../../common/validators/cpf.validator';

@InputType()
export class CreatePatientDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Validate(CpfValidator)
  cpf: string;
  static cpf: any;
}
