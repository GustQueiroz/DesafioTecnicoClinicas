/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Clinic } from '../../clinic/entities/clinic.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';

@ObjectType()
export class Professional {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  specialty: string;

  @Field(() => Int)
  clinicId: number;

  @Field(() => Clinic, { nullable: true })
  clinic?: Clinic;

  @Field(() => [Schedule], { nullable: true })
  schedules?: Schedule[];
}
