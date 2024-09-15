import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from '@internal/dto/dto.user';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): CreateUserDTO {
    return {
      email: 'test',
      password: 'test',
    };
  }
}
