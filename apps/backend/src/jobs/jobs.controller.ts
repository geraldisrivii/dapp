import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from '@nestjs/swagger';
import { CreateJob, Job } from '~/jobs/jobs.model';
import { JobsService } from '~/jobs/jobs.service';
import { FormDataToJson } from '~/pipes/pipes.json-formdata';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
  @ApiResponse({ status: 201, type: Job })
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  // @UseGuards(AuthGuard, RolesAuthGuard)
  // @UseRoles(RoleDTO.ADMIN, RoleDTO.EMPLOYEE)
  @UsePipes(new FormDataToJson<CreateJob>('attachments', 'tags'))
  makeJob(
    @Body() dto: CreateJob,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.jobsService.createJob(dto, files);
  }
}
