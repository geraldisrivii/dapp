import {
  CreateUserDTO,
  SignUpByWalletDTO,
  UserDTO,
} from '@internal/dto/dto.user';
import {
  HttpException,
  Injectable,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '~/users/users.service';
import { Refresh, User } from '~/users/users.model';
import { publicClient } from '~/constants/constants.client';
import { TokenDTO } from '@internal/dto/dto.auth';
import { Request as RequestExpress } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userServise: UsersService,
    private jwtServise: JwtService,
  ) {}

  async signupByWallet({ address, signature, role }: SignUpByWalletDTO) {
    const valid = await publicClient.verifyMessage({
      address,
      signature,
      message: 'hello',
    });

    if (!valid) {
      throw new HttpException('Invalid signature', 400);
    }

    let user = await this.userServise.getUserByAddressAndRole(address, role);

    if (!user) {
      user = await this.userServise.createUser({ address, role });
    }

    return {
      user,
      access: this.generateAccessToken(user),
      refresh: this.generateRefreshToken(user),
    };
  }

  private generateAccessToken(user: User) {
    return this.jwtServise.sign(
      {
        user,
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
        user,
        type: 'refresh',
      },
      {
        expiresIn: '10d',
      },
    );
  }

  refresh(dto: Refresh) {
    try {
      const result = this.jwtServise.verify<TokenDTO>(dto.refresh);
  
      const { user } = result;
  
      return {
        access: this.generateAccessToken(user),
        refresh: this.generateRefreshToken(user),
        user,
      };
    } catch (e: any) {
      throw new UnauthorizedException(e.message);
    }
  }
}
