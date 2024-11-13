import { CreateAttachmentDTO } from '@internal/dto/dto.attachment';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from '~/attachments/attachments.model';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private readonly attachmentRepository: Repository<Attachment>,
  ) {}
  async createAttachments(dto: CreateAttachmentDTO[]) {
    return this.attachmentRepository.save(dto);
  }
}
