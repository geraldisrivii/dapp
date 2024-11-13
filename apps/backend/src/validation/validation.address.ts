import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'isAddress', async: true })
@Injectable()
export class AddressConstraint implements ValidatorConstraintInterface {
  constructor() {}

  async validate(value: string): Promise<boolean> {
    return /^(0x)?[0-9a-fA-F]{40}$/.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is not a valid address`;
  }
}

export function IsAddress(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: AddressConstraint,
    });
  };
}
