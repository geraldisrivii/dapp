import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from 'src/config/config.env';
import { User } from '~/users/users.model';
import { RolesService } from './roles/roles.service';
import { RolesModule } from './roles/roles.module';
import { Role } from '~/roles/roles.model';
import { UsersRoles } from '~/user_roles/users_roles.model';
import { AuthModule } from './auth/auth.module';

const config = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      uri:
        config.get('DATABASE_URL') ||
        'postgres://root:root@localhost:5432/nest',
      models: [User, Role, UsersRoles],
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
