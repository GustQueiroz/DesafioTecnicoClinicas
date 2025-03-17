/* eslint-disable prettier/prettier */

import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateAppointmentDto {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  scheduleId: number;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  patientId: number;

  @Field()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date: Date;

  @Field()
  @IsString()
  @IsNotEmpty()
  status: string;
}
