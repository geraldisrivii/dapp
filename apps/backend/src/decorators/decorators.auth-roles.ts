import { ExecutionContext } from '@nestjs/common';
import { UsersController } from '~/users/users.controller';

const endpoint_roles: Record<string, Array<string>> = {};

export function UseRoles(...roles: string[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    endpoint_roles[`${target.constructor.name}:${propertyKey}`] = roles;
  };
}

export function getEndpointRoles(context: ExecutionContext) {
  return (
    endpoint_roles[context.getClass().name + ':' + context.getHandler().name] ??
    null
  );
}

export function matchSomeEndpointRole(context: ExecutionContext, role: string) {
  const roles = getEndpointRoles(context);

  if (roles.includes(role)) {
    return true;
  }

  return false;
}
