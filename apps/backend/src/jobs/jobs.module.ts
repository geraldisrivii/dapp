import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from '~/jobs/jobs.model';
import { FilesModule } from '~/files/files.module';
import { AttachmentsModule } from '~/attachments/attachments.module';
import { AuthModule } from '~/auth/auth.module';
import { TagsModule } from '~/tags/tags.module';
import { CategoryModule } from '~/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Job]),
    FilesModule,
    AttachmentsModule,
    AuthModule,
    TagsModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
