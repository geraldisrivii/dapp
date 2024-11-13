import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from 'src/config/config.env';
import { User } from '~/users/users.model';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { source } from '~/config/config.data-source';
import { JobsModule } from './jobs/jobs.module';
import { Job } from '~/jobs/jobs.model';
import { AttachmentsService } from './attachments/attachments.service';
import { AttachmentsModule } from './attachments/attachments.module';
import { Attachment } from '~/attachments/attachments.model';
import { FilesService } from './files/files.service';
import { FilesModule } from './files/files.module';
import { TagsModule } from './tags/tags.module';
import { Tag } from '~/tags/tag.model';

const config = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      ...source.options,
      entities: [User, Job, Attachment, Tag],
    }),
    UsersModule,
    AuthModule,
    JobsModule,
    AttachmentsModule,
    FilesModule,
    TagsModule,
  ],
  controllers: [],
})
export class AppModule {}
