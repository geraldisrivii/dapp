import { ConfigService } from '@nestjs/config';
import { RemoveUserModelEmailProp1730640216750 } from '../migrations/1730640216750-remove-user-model-email-prop';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(`.${process.env.NODE_ENV}.env`),
});

const config = new ConfigService();

export const source = new DataSource({
  type: 'postgres',
  username: config.get('DATABASE_USERNAME'),
  password: config.get('DATABASE_PASSWORD') || 'root',
  database: config.get('DATABASE_NAME') || 'nest',
  host: config.get('DATABASE_HOST'),
  port: config.get('DATABASE_PORT'),
  migrations: [RemoveUserModelEmailProp1730640216750],
  synchronize: true,
});
