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
      dialect: config.get('DATABASE_DIALECT') || 'postgres',
      host: config.get('DATABASE_HOST') || 'localhost',
      port: config.get('DATABASE_PORT') || 5432,
      username: config.get('DATABASE_USERNAME') || 'root',
      password: config.get('DATABASE_PASSWORD') || 'root',
      database: config.get('DATABASE_NAME') || 'nest',
      autoLoadModels: true,
      synchronize: true,
      models: [User, Role, UsersRoles],
    }),
    UsersModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule {}
