import { ApiProperty } from '@nestjs/swagger';

export function SwaggerID(description: string = 'Unique identifier') {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({ example: '1', description })(...args);
  };
}

export function SwaggerEmail(description: string = 'Email address') {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({
      example: 'user@example.com',
      description,
    })(...args);
  };
}

export function SwaggerPassword(description: string = 'password') {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({
      example: 'some_pass_A1',
      description,
    })(...args);
  };
}

export function SwaggerValue(description: string = 'Value') {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({
      example: 'some value',
      description,
    })(...args);
};
}

export function SwaggerBoolean(description?: string) {
  return function (...args: Parameters<PropertyDecorator>) {
    return ApiProperty({ example: 'true', description })(...args);
  };
}
