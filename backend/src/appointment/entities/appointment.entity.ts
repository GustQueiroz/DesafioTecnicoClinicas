/* eslint-disable prettier/prettier */

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { Patient } from '../../patient/entities/patient.entity';

@ObjectType()
export class Appointment {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  scheduleId: number;

  @Field(() => Int)
  patientId: number;

  @Field()
  date: Date;

  @Field()
  status: string;

  @Field(() => Schedule, { nullable: true })
  schedule?: Schedule;

  @Field(() => Patient, { nullable: true })
  patient?: Patient;
}
