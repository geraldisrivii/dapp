import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateTagDTO, TagDTO } from '@dapp/dto/dto.tag';
import { SwaggerID, SwaggerValue } from '~/swager/swager.decorators';
import { IsString } from 'class-validator';
import { Job } from '~/jobs/jobs.model';
import { JobDTO } from '@internal/dto/dto.job';

export class CreateTag implements CreateTagDTO {
  @SwaggerValue()
  @IsString()
  label: string;
}

@Entity({ name: 'tags' })
export class Tag implements TagDTO {
  @SwaggerID()
  @PrimaryGeneratedColumn()
  id: number;
  @SwaggerValue()
  @Column()
  label: string;

  @ManyToOne(() => Job, (job) => job.tags)
  job: JobDTO;
}
