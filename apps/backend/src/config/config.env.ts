import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import { Dialect } from 'sequelize';
import { DialectEnum } from './types/types.dialect';

class EnvironmentVariables {
  @IsEnum(DialectEnum)
  DATABASE_DIALECT: Dialect;

  @IsString()
  DATABASE_HOST: string;

  @IsString()
  DATABASE_USERNAME: string;

  @IsString()
  DATABASE_PASSWORD: string;

  @IsString()
  DATABASE_NAME: string;

  @IsNumber()
  DATABASE_PORT: number;

  @IsString()
  APP_VERSION: string;

  @IsString()
  APP_JWT_SECRET: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
