import { CreateRoleDTO } from '@internal/dto/dto.role';
import { Injectable, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRole, Role } from '~/roles/roles.model';

@ApiTags('roles')
@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role) private readonly roleRepository: typeof Role,
  ) {}
  createRole(dto: CreateRole) {
    return this.roleRepository.create(dto);
  }
  getRoleByValue(value: string) {
    return this.roleRepository.findOne({ where: { value } });
  }
}
