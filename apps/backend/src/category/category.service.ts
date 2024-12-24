import { CreateCategoryDTO, CreateCategoryDTOWithoutFiles } from '@internal/dto/dto.category';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.model';
import { Repository } from 'typeorm';
import { FilesService } from '~/files/files.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly filesService: FilesService,
  ) {}
  createCategory(
    dto: CreateCategoryDTOWithoutFiles,
    image: Express.Multer.File,
    miniature: Express.Multer.File,
  ) {
    const imageSrc = this.filesService.createFile(image);
    const miniatureSrc = this.filesService.createFile(miniature);

    return this.categoryRepository.save({
      ...dto,
      image: imageSrc,
      miniature: miniatureSrc,
    });
  }
  getCategoryBySlug(slug: string) {
    return this.categoryRepository.findOneBy({ slug });
  }
  getCategories() {
    return this.categoryRepository.find();
  }
}
