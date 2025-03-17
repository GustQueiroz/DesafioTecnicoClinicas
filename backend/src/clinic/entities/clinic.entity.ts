import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Professional } from '../../professional/entities/professional.entity';
import { Schedule } from '../../schedule/entities/schedule.entity';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class Clinic {
  @ApiProperty({
    description: 'ID único da clínica',
    example: 1,
  })
  @Field(() => Int)
  id: number;

  @ApiProperty({
    description: 'Nome da clínica',
    example: 'Clínica Central',
  })
  @Field()
  name: string;

  @ApiProperty({
    description: 'Localização da clínica',
    example: 'Rua Principal, 123',
  })
  @Field()
  location: string;

  @ApiProperty({
    description: 'Profissionais da clínica',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          example: 1,
        },
        name: {
          type: 'string',
          example: 'Dr. Carlos',
        },
        specialty: {
          type: 'string',
          example: 'Cardiologia',
        },
      },
    },
  })
  @Field(() => [Professional], { nullable: true })
  professionals?: Professional[];

  @ApiProperty({
    description: 'Agendas da clínica',
    type: 'array',
    items: {
      type: 'object',
    },
  })
  @Field(() => [Schedule], { nullable: true })
  schedules?: Schedule[];
}
