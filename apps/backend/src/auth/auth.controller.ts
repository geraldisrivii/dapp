import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from '~/auth/auth.service';
import { CreateUser } from '~/users/users.model';
import { Auth } from '~/auth/auth.model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ status: 200, type: Auth })
  @Post('/signup')
  registartion(@Body() dto: CreateUser) {
    return this.authService.register(dto);
  }
}
