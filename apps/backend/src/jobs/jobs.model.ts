import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateJobDTO, JobDTO } from '@dapp/dto/dto.job';
import { JobPriceTypeDTO } from '@internal/dto/dto.job';
import { UserDTO } from '@internal/dto/dto.user';
import {
  SwaggerDate,
  SwaggerID,
  SwaggerValue,
} from '~/swager/swager.decorators';
import { User } from '~/users/users.model';
import { Attachment, CreateAttachment } from '~/attachments/attachments.model';
import {
  AttachmentDTO,
  AttachmentType,
  CreateAttachmentDTO,
} from '@internal/dto/dto.attachment';
import { CreateTagDTO, TagDTO } from '@internal/dto/dto.tag';
import { CreateTag, Tag } from '~/tags/tag.model';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '~/category/category.model';

export class CreateJob implements CreateJobDTO {
  @IsString()
  @ApiProperty({ type: [CreateAttachment] })
  attachments: CreateAttachmentDTO[];
  @IsString()
  @SwaggerValue()
  title: string;
  @IsString()
  @SwaggerValue()
  description: string;
  @IsString()
  @SwaggerValue()
  category: string;
  @IsString()
  @SwaggerValue()
  price: bigint;
  @IsString()
  @ApiProperty({ type: [CreateTag] })
  tags: CreateTagDTO[];

  @IsEnum(JobPriceTypeDTO)
  @ApiProperty({ enum: JobPriceTypeDTO })
  type: JobPriceTypeDTO;
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

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, (user) => user)
  user: UserDTO;

  @ApiProperty({ type: () => Tag })
  @ManyToMany(() => Tag)
  @JoinTable({ name: 'jobs_tags' })
  tags: TagDTO[];

  @ApiProperty({ type: () => [Attachment] })
  @OneToMany(() => Attachment, (attachment) => attachment.job)
  attachments: AttachmentDTO[];

  @ApiProperty({ type: () => Category })
  @ManyToOne(() => Category, (c) => c.jobs)
  category: Category;

  @SwaggerValue()
  @Column('bigint')
  price: bigint;

  @ApiProperty({ enum: JobPriceTypeDTO })
  @Column({
    type: 'enum',
    enum: JobPriceTypeDTO,
    default: JobPriceTypeDTO.FIXED,
  })
  type: JobPriceTypeDTO;

  @SwaggerDate()
  @CreateDateColumn()
  created_at: Date; // Creation date

  @SwaggerDate()
  @UpdateDateColumn()
  updated_at: Date;
}
