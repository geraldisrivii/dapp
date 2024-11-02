import {
  Controller,
  Sse,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { eventBus } from '~/classes/classes.event-bus';
import { UsersService } from '~/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Sse('/sse')
  sse() {
    return new Observable((observer) => {
      eventBus.subscribe('paid', (data) => {
        observer.next(data);
      });
    });
  }
}
