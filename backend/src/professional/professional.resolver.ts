/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Resolver(() => Professional)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProfessionalResolver {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Mutation(() => Professional)
  @Roles('ADMIN')
  createProfessional(
    @Args('createProfessionalDto') createProfessionalDto: CreateProfessionalDto,
  ) {
    return this.professionalService.create(createProfessionalDto);
  }

  @Query(() => [Professional], { name: 'professionals' })
  @Roles('ADMIN')
  findAllByClinic(@Args('clinicId', { type: () => Int }) clinicId: number) {
    return this.professionalService.findAllByClinic(clinicId);
  }

  @Query(() => Professional, { name: 'professional' })
  @Roles('ADMIN')
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.professionalService.findOne(id);
  }

  @Mutation(() => Professional)
  @Roles('ADMIN')
  updateProfessional(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProfessionalDto') updateProfessionalDto: UpdateProfessionalDto,
  ) {
    return this.professionalService.update(id, updateProfessionalDto);
  }

  @Mutation(() => Professional)
  @Roles('ADMIN')
  removeProfessional(@Args('id', { type: () => Int }) id: number) {
    return this.professionalService.remove(id);
  }
}
