import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from '~/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersContract } from '~/users/users.contract';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '~/users/users.model';

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
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
