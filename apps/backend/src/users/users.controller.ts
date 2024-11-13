import { Controller, Get, Sse } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { eventBus } from '~/classes/classes.event-bus';
import { User } from '~/users/users.model';
import { UsersService } from '~/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 200, type: [User] })
  @Get()
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Sse('/sse')
  sse() {
    return new Observable((observer) => {
      eventBus.subscribe('paid', (data) => {
        observer.next(data);
      });
    });
  }
}
