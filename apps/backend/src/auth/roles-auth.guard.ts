import { AuthDTO } from '@internal/dto/dto.auth';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { getEndpointRoles } from '~/decorators/decorators.auth-roles';
import { validateToken } from '~/helpers/helpers.auth';

@Injectable()
export class RolesAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers.authorization;

    const tokenValue = validateToken(token);

    const data = this.jwtService.verify<AuthDTO>(tokenValue);

    const roles = getEndpointRoles(context);

    if (!roles) {
      return true;
    }

    if (roles && data.user.roles.some((role) => roles.includes(role.value))) {
      return true;
    }

    throw new HttpException('No access', 403);
  }
}
