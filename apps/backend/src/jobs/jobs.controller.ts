import { JobPriceTypeDTO, QueryFiltersDTO } from '@internal/dto/dto.job';
import { RoleDTO } from '@internal/dto/dto.role';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request as RequestExpress } from 'express';
import { AuthGuard } from '~/auth/auth.guard';
import { RolesAuthGuard } from '~/auth/roles-auth.guard';
import { UseRoles } from '~/decorators/decorators.auth-roles';
import { CreateJob, Job } from '~/jobs/jobs.model';
import { JobsService } from '~/jobs/jobs.service';
import { FormDataToJson } from '~/pipes/pipes.json-formdata';
import { QueryParserPipe } from '~/pipes/pipes.query-parser';
import { ProjectValidationPipe } from '~/pipes/pipes.validation';

@Controller('jobs')
@ApiTags('Jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly jwtService: JwtService,
  ) {}
  @ApiResponse({ status: 201, type: Job })
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard, RolesAuthGuard)
  @UseRoles(RoleDTO.ADMIN, RoleDTO.EMPLOYER)
  @UsePipes(new FormDataToJson<CreateJob>('attachments', 'tags'))
  async makeJob(
    @Body() dto: CreateJob,
    @UploadedFiles() files: Express.Multer.File[],
    @Request() req: RequestExpress,
  ) {
    const { user } = await this.jwtService.verifyAsync(
      req.headers.authorization!.split(' ')[1],
    );

    return this.jobsService.createJob(dto, files, user);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Job] })
  @ApiQuery({ name: 'categories', type: [String], required: false })
  @ApiQuery({
    name: 'filters',
    enum: QueryFiltersDTO,
    isArray: true,
    required: false,
  })
  @ApiQuery({ name: 'type', enum: JobPriceTypeDTO, required: false })
  async getJobs(
    @Query('categories') categories?: string[],
    @Query('filters') filters?: QueryFiltersDTO[],
    @Query('type') type?: JobPriceTypeDTO,
  ) {
    return this.jobsService.getJobs(categories, filters, type);
  }
}
