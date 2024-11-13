import { AttachmentDTO, AttachmentType } from '@internal/dto/dto.attachment';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from '~/jobs/jobs.model';
import { SwaggerID, SwaggerValue } from '~/swager/swager.decorators';

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
