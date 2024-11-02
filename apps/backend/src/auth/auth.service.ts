import { CreateUserDTO, UserDTO } from '@internal/dto/dto.user';
import {
  HttpException,
  Injectable,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '~/users/users.service';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { User } from '~/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userServise: UsersService,
    private jwtServise: JwtService,
  ) {}

  async login(dto: CreateUserDTO) {
    const user = await this.userServise.getUserByEmail(dto.email);

    if (!user) {
      throw new HttpException('User with this email not exists', 400);
    }

    if (!this.userServise.validPasswordSync(user, dto.password)) {
      throw new UnauthorizedException('Wrong password');
    }

    return {
      access: this.generateAccessToken(user),
      refresh: this.generateRefreshToken(user),
      user: {
        ...user.get({ plain: true }),
        roles: user.roles,
      },
    };
  }

  async register(dto: CreateUserDTO) {
    if (await this.userServise.getUserByEmail(dto.email)) {
      throw new HttpException('User with this email already exists', 400);
    }

    const passwordHash = await bcrypt.hash(dto.password, 3);

    const user = await this.userServise.createUser({
      ...dto,
      password: passwordHash,
    });

    return {
      access: this.generateAccessToken(user),
      refresh: this.generateRefreshToken(user),
      user: {
        ...user.get({ plain: true }),
        roles: user.roles,
      },
    };
  }

  private generateAccessToken(user: User) {
    return this.jwtServise.sign(
      {
        user: {
          ...user.get({ plain: true }),
          roles: user.roles,
        },
        type: 'access',
      },
      {
        expiresIn: '15m',
      },
    );
  }

  private generateRefreshToken(user: User) {
    return this.jwtServise.sign(
      {
        user: {
          ...user.get({ plain: true }),
          roles: user.roles,
        },
        type: 'refresh',
      },
      {
        expiresIn: '10d',
      },
    );
  }
}
