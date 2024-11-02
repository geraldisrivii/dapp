import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '~/users/users.model';
import { Role } from '~/roles/roles.model';
import { UsersRoles } from '~/user_roles/users_roles.model';
import { RolesModule } from '~/roles/roles.module';
import { AuthModule } from '~/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersContract } from '~/users/users.contract';


const config = new ConfigService();

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersContract],
  imports: [
    JwtModule.register({
      secret: config.get('APP_JWT_SECRET') || 'secret',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    SequelizeModule.forFeature([User, Role, UsersRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
