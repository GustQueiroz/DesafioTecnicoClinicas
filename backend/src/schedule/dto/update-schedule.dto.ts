/* eslint-disable prettier/prettier */
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { CreateScheduleDto } from './create-schedule.dto';

@InputType()
export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  id?: number;
}
