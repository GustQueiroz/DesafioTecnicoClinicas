/* eslint-disable prettier/prettier */

import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { CreateAppointmentDto } from './create-appointment.dto';

@InputType()
export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  id?: number;
}
