import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateJobDTO, JobDTO } from '@dapp/dto/dto.job';
import { UserDTO } from '@internal/dto/dto.user';
import { SwaggerID, SwaggerValue } from '~/swager/swager.decorators';
import { User } from '~/users/users.model';
import { Attachment } from '~/attachments/attachments.model';
import { AttachmentDTO, CreateAttachmentDTO } from '@internal/dto/dto.attachment';
import { CreateTagDTO, TagDTO } from '@internal/dto/dto.tag';
import { Tag } from '~/tags/tag.model';


export class CreateJob implements CreateJobDTO{
  attachments: CreateAttachmentDTO[];
  title: string;
  description: string;
  price: bigint;
  tags: CreateTagDTO[];
}

@Entity({ name: 'jobs' })
export class Job implements JobDTO {  
  @SwaggerID()
  @PrimaryGeneratedColumn()
  id: number;

  @SwaggerValue()
  @Column()
  title: string;

  @SwaggerValue()
  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user)
  user: UserDTO;

  @OneToMany(() => Tag, (tag) => tag.job)
  tags: TagDTO[];

  @OneToMany(() => Attachment, (attachment) => attachment.job)
  attachments: AttachmentDTO[];

  @SwaggerValue()
  @Column('bigint')
  price: bigint;
}
