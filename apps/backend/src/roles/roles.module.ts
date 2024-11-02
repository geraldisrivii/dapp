import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from '~/roles/roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from '~/roles/roles.model';
import { User } from '~/users/users.model';
import { UsersRoles } from '~/user_roles/users_roles.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, User, UsersRoles]),
  ],
  exports: [RolesService],
})
export class RolesModule {}
