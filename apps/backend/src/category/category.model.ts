import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryDTO, CreateCategoryDTO, CreateCategoryDTOWithoutFiles } from '@internal/dto/dto.category';
import { SwaggerFile, SwaggerID, SwaggerValue } from '~/swager/swager.decorators';
import { IsString } from 'class-validator';
import { Job } from '~/jobs/jobs.model';

export class CreateCategory implements CreateCategoryDTOWithoutFiles {
  @IsString()
  @SwaggerValue()
  name: string;

  @IsString()
  @SwaggerValue()
  slug: string;
}

@Entity({ name: 'categories' })
export class Category implements CategoryDTO {
  @SwaggerID()
  @PrimaryGeneratedColumn()
  id: number;
  @SwaggerValue()
  @Column()
  name: string;
  @SwaggerValue()
  @Column()
  slug: string;
  @SwaggerFile()
  @Column()
  image: string;
  @SwaggerFile()
  @Column()
  miniature: string;
  @OneToMany(() => Job, (job) => job.category)
  jobs: Job[];
}
