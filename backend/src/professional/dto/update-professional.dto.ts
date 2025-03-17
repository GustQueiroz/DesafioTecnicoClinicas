/* eslint-disable prettier/prettier */
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { CreateProfessionalDto } from './create-professional.dto';

@InputType()
export class UpdateProfessionalDto extends PartialType(CreateProfessionalDto) {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  id?: number;
}
