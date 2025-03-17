/* eslint-disable prettier/prettier */

import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { CreateClinicDto } from './create-clinic.dto';

@InputType()
export class UpdateClinicDto extends PartialType(CreateClinicDto) {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  id?: number;
}
