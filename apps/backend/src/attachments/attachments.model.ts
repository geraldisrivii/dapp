import { AttachmentDTO, AttachmentType, CreateAttachmentDTO } from '@internal/dto/dto.attachment';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from '~/jobs/jobs.model';
import { SwaggerID, SwaggerValue } from '~/swager/swager.decorators';

export class CreateAttachment implements CreateAttachmentDTO {
  @IsString()
  @ApiProperty({ type: 'enum', enum: AttachmentType })
  type: AttachmentType;
  @IsString()
  @SwaggerValue()
  title: string;
  @IsString()
  @SwaggerValue()
  value: string;
}


@Entity({ name: 'attachments' })
export class Attachment implements AttachmentDTO {
  @SwaggerID()
  @PrimaryGeneratedColumn()
  id: number;

  @SwaggerValue()
  @Column()
  title: string;

  @SwaggerValue()
  @Column()
  value: string;

  @SwaggerValue()
  @Column({ type: 'enum', enum: AttachmentType })
  type: AttachmentType;

  @ManyToOne(() => Job, (job) => job.attachments)
  job: Job;
}
