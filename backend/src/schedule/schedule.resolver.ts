/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Schedule)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Mutation(() => Schedule)
  @Roles('ADMIN')
  createSchedule(
    @Args('createScheduleDto') createScheduleDto: CreateScheduleDto,
  ) {
    return this.scheduleService.create(createScheduleDto);
  }

  @Query(() => [Schedule], { name: 'schedules' })
  @Roles('ADMIN')
  findAll() {
    return this.scheduleService.findAll();
  }

  @Query(() => [Schedule], { name: 'schedulesByClinic' })
  @Roles('ADMIN')
  findByClinic(@Args('clinicId', { type: () => Int }) clinicId: number) {
    return this.scheduleService.findByClinic(clinicId);
  }

  @Query(() => [Schedule], { name: 'schedulesByProfessional' })
  @Roles('ADMIN')
  findByProfessional(
    @Args('professionalId', { type: () => Int }) professionalId: number,
  ) {
    return this.scheduleService.findByProfessional(professionalId);
  }

  @Query(() => Schedule, { name: 'schedule' })
  @Roles('ADMIN')
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.scheduleService.findOne(id);
  }

  @Mutation(() => Schedule)
  @Roles('ADMIN')
  updateSchedule(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateScheduleDto') updateScheduleDto: UpdateScheduleDto,
  ) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Mutation(() => Schedule)
  @Roles('ADMIN')
  removeSchedule(@Args('id', { type: () => Int }) id: number) {
    return this.scheduleService.remove(id);
  }
}
