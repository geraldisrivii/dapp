import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateRole, Role } from '~/roles/roles.model';
import { RolesService } from '~/roles/roles.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  @ApiResponse({ status: 201, type: Role })
  create(@Body() dto: CreateRole) {
    return this.rolesService.createRole(dto);
  }

  @Get('/:value')
  async getRoleByValue(@Param('value') value: string) {
    return await this.rolesService.getRoleByValue(value);
  }
}
