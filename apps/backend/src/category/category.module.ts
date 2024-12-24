import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.model';
import { AuthModule } from '~/auth/auth.module';
import { FilesModule } from '~/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AuthModule, FilesModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
