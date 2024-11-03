// src/sequelize/config.ts

import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';

interface ISequelizeConfig {
  [key: string]: {
    dialect: Dialect;
    url: string;
  };
}

const env = new ConfigService();

const config: ISequelizeConfig = {
  development: {
    dialect: 'postgres',
    url: env.get('DATABASE_URL') || 'postgres://root:root@localhost:5432/nest',
  },
  test: {
    dialect: 'postgres',
    url: env.get('DATABASE_URL') || 'postgres://root:root@localhost:5432/nest',
  },
  production: {
    dialect: 'postgres',
    url: env.get('DATABASE_URL') || 'postgres://root:root@localhost:5432/nest',
  },
};

export = config;
