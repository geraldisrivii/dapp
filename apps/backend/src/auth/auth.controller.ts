import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '~/auth/auth.service';
import { Refresh, SignupByWallet } from '~/users/users.model';
import { Auth } from '~/auth/auth.model';
import { Request as RequestExpress } from 'express';
import { AuthGuard } from './auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 200, type: Auth })
  @Post('/signup')
  registartion(@Body() dto: SignupByWallet) {
    return this.authService.signupByWallet(dto);
  }

  @ApiResponse({ status: 200, type: Auth })
  @Post('/refresh')
  refresh(@Body() dto: Refresh) {
    return this.authService.refresh(dto);
  }
}
