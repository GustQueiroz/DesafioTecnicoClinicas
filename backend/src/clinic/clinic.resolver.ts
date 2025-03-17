import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { Clinic } from './entities/clinic.entity';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Clinic)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClinicResolver {
  constructor(private readonly clinicService: ClinicService) {}

  @Mutation(() => Clinic)
  @Roles('ADMIN')
  createClinic(@Args('createClinicDto') createClinicDto: CreateClinicDto) {
    return this.clinicService.create(createClinicDto);
  }

  @Query(() => [Clinic], { name: 'clinics' })
  @Roles('ADMIN')
  findAll() {
    return this.clinicService.findAll();
  }

  @Query(() => Clinic, { name: 'clinic' })
  @Roles('ADMIN')
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.clinicService.findOne(id);
  }

  @Mutation(() => Clinic)
  @Roles('ADMIN')
  updateClinic(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateClinicDto') updateClinicDto: UpdateClinicDto,
  ) {
    return this.clinicService.update(id, updateClinicDto);
  }

  @Mutation(() => Clinic)
  @Roles('ADMIN')
  removeClinic(@Args('id', { type: () => Int }) id: number) {
    return this.clinicService.remove(id);
  }
}
