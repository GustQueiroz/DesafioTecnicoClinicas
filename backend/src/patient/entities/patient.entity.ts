/* eslint-disable prettier/prettier */

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Appointment } from '../../appointment/entities/appointment.entity';

@ObjectType()
export class Patient {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  cpf: string;

  @Field(() => [Appointment], { nullable: true })
  appointments?: Appointment[];
}
