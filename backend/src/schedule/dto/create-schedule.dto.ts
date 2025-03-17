/* eslint-disable prettier/prettier */
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateScheduleDto {
  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  professionalId: number;

  @Field()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  date: Date;

  @Field()
  @IsString()
  @IsNotEmpty()
  time: string;
}
