import { RoleDTO } from '@internal/dto/dto.role';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';
import { RolesAuthGuard } from '~/auth/roles-auth.guard';
import { UseRoles } from '~/decorators/decorators.auth-roles';
import { CreateTag } from '~/tags/tag.model';
import { TagsService } from '~/tags/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  
  @Post()
  @UseGuards(AuthGuard, RolesAuthGuard)
  // @UseRoles(RoleDTO.ADMIN)
  createTags(@Body() dto: CreateTag) {
    return this.tagsService.createTag(dto);
  }
}
