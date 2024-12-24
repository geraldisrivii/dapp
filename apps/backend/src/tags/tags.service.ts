import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTag, Tag } from '~/tags/tag.model';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
  ) {}

  createTag(dto: CreateTag) {
    return this.tagRepository.save(dto);
  }

  createTags(dto: CreateTag[]) {
    return this.tagRepository.save(dto);
  }

  async findExistingTags(dto: CreateTag[]) {
    return await this.tagRepository
      .createQueryBuilder()
      .where('label IN (:...labels)', { labels: dto.map((item) => item.label) })
      .getMany();
  }
}
