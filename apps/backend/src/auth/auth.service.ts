import {
  CreateUserDTO,
  SignUpByWalletDTO,
  UserDTO,
} from '@internal/dto/dto.user';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '~/users/users.service';
import { User } from '~/users/users.model';
import { publicClient } from '~/constants/constants.client';

@Injectable()
export class AuthService {
  constructor(
    private userServise: UsersService,
    private jwtServise: JwtService,
  ) {}

  async signupByWallet({ address, signature }: SignUpByWalletDTO) {
    const valid = await publicClient.verifyMessage({
      address,
      signature,
      message: 'hello',
    });

    if (!valid) {
      throw new HttpException('Invalid signature', 400);
    }

    let user = await this.userServise.getUserByAddress(address);

    
    if (!user) {
      user = await this.userServise.createUser({ address });
    }

    return {
      user,
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
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
}
