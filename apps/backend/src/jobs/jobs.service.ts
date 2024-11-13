import {
  AttachmentType,
  CreateAttachmentDTO,
} from '@internal/dto/dto.attachment';
import { CreateJobDTO } from '@internal/dto/dto.job';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttachmentsService } from '~/attachments/attachments.service';
import { FilesService } from '~/files/files.service';
import { Job } from '~/jobs/jobs.model';
import { TagsService } from '~/tags/tags.service';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job) private readonly jobRepository: Repository<Job>,
    private readonly filesService: FilesService,
    private readonly tagsService: TagsService,
    private readonly attachmentsService: AttachmentsService,
  ) {}

  async createJob(dto: CreateJobDTO, files: Express.Multer.File[]) {
    const attachmentsFiles: CreateAttachmentDTO[] = files.map((file, index) => {
      const name = files[index].originalname;

      return {
        value: this.filesService.createFile(file),
        type: AttachmentType.IMAGE,
        title: name.slice(0, name.lastIndexOf('.')),
      };
    });

    const attachments = await this.attachmentsService.createAttachments([
      ...attachmentsFiles,
      ...dto.attachments,
    ]);

    const tags = await this.tagsService.createTags(dto.tags);

    return this.jobRepository.save({
      ...dto,
      attachments,
      tags,
    });
  }
}
