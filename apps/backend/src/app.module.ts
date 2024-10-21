import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { Dialect } from 'sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot({
      dialect: process.env.DATABASE_DIALECT || 'postgres',
      host: 'localhost',
      port: (process.env.DATABASE_PORT as unknown as number) || 5432,
      username: 'root',
      password: 'root',
      database: 'nest',
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
