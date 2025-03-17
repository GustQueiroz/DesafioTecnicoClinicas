/* eslint-disable prettier/prettier */

import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateClinicDto {
  @ApiProperty({
    description: 'Nome da clínica',
    example: 'Clínica Central',
  })
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Localização da clínica',
    example: 'Rua Principal, 123',
  })
  @Field()
  @IsString()
  @IsNotEmpty()
  location: string;
}
