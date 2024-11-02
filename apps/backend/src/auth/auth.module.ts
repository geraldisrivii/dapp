import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '~/users/users.service';
import { UsersModule } from '~/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from '~/config/config.env';

const config = new ConfigService();

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      secret: config.get('APP_JWT_SECRET') || 'secret',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    forwardRef(() => UsersModule),
  ],
})
export class AuthModule {}
