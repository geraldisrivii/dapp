import {
  AttachmentType,
  CreateAttachmentDTO,
} from '@internal/dto/dto.attachment';
import {
  CreateJobDTO,
  JobPriceTypeDTO,
  QueryFiltersDTO,
} from '@internal/dto/dto.job';
import { UserDTO } from '@internal/dto/dto.user';
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttachmentsService } from '~/attachments/attachments.service';
import { CategoryService } from '~/category/category.service';
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
    private readonly categoryService: CategoryService,
    private readonly jwtService: JwtService,
  ) {}

  async createJob(
    dto: CreateJobDTO,
    files: Express.Multer.File[],
    user: UserDTO,
  ) {
    const attachmentsFiles: CreateAttachmentDTO[] = files.map((file, index) => {
      const name = files[index].originalname;

      return {
        value: this.filesService.createFile(file),
        type: AttachmentType.IMAGE,
        title: name.slice(0, name.lastIndexOf('.')),
      };
    });

    const attachments = await this.attachmentsService.createAttachments(
      dto.attachments.concat(attachmentsFiles),
    );

    const category = await this.categoryService.getCategoryBySlug(dto.category);

    if (!category) {
      throw new HttpException('Category not found', 404);
    }

    const tags = await this.tagsService.findExistingTags(dto.tags);

    return this.jobRepository.save({
      ...dto,
      attachments,
      tags,
      category,
      user,
    });
  }

  getJobs(
    categories: string[] = [],
    filters: QueryFiltersDTO[] = [],
    type: JobPriceTypeDTO | undefined,
  ) {
    const query = this.jobRepository
      .createQueryBuilder('jobs')
      .leftJoinAndSelect('jobs.attachments', 'attachments')
      .leftJoinAndSelect('jobs.tags', 'tags')
      .leftJoinAndSelect('jobs.user', 'user')
      .leftJoinAndSelect('jobs.category', 'category');

    if (categories.length) {
      query.andWhere('category.slug IN (:...categories)', { categories });
    }

    if (type) {
      query.andWhere('jobs.type = :type', { type });
    }

    if (filters.includes(QueryFiltersDTO.NEW)) {
      query.orderBy('jobs.createdAt', 'DESC');
    }

    return query.getMany();
  }
}
