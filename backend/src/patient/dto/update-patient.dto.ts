/* eslint-disable prettier/prettier */

import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { CreatePatientDto } from './create-patient.dto';

@InputType()
export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  id?: number;
}
