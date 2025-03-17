/* eslint-disable prettier/prettier */
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

@InputType()
export class CreateProfessionalDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  specialty: string;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  clinicId: number;
}
