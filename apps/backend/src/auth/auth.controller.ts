import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '~/auth/auth.service';
import { SignupByWallet } from '~/users/users.model';
import { Auth } from '~/auth/auth.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 200, type: Auth })
  @Post('/signup')
  registartion(@Body() dto: SignupByWallet) {
    return this.authService.signupByWallet(dto);
  }
}
