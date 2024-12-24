import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiResponse } from '@nestjs/swagger';
import { Category, CreateCategory } from './category.model';
import { AuthGuard } from '~/auth/auth.guard';
import { RolesAuthGuard } from '~/auth/roles-auth.guard';
import { UseRoles } from '~/decorators/decorators.auth-roles';
import { RoleDTO } from '@internal/dto/dto.role';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @ApiResponse({ status: 201, type: Category })
  @UseGuards(AuthGuard, RolesAuthGuard)
  // @UseRoles(RoleDTO.ADMIN)
  createCategory(
    @Body() dto: CreateCategory,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.categoryService.createCategory(dto, files[0], files[1]);
  }

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }
}
