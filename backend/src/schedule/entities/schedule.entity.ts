/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Professional } from '../../professional/entities/professional.entity';
import { Appointment } from '../../appointment/entities/appointment.entity';
import { Clinic } from '../../clinic/entities/clinic.entity';

@ObjectType()
export class Schedule {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  professionalId: number;

  @Field()
  date: Date;

  @Field()
  time: string;

  @Field(() => Professional, { nullable: true })
  professional?: Professional;

  @Field(() => [Appointment], { nullable: true })
  appointments?: Appointment[];

  @Field(() => [Clinic], { nullable: true })
  clinics?: Clinic[];
}
