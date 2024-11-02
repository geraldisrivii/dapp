import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from 'cors';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ProjectValidationPipe } from '~/pipes/pipes.validation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const env = new ConfigService();

  const config = new DocumentBuilder()
    .setTitle('ETH freelance platform API')
    .setDescription('API description')
    .setVersion(env.get('APP_VERSION')!)
    .build();

  app.useGlobalPipes(new ProjectValidationPipe());

  app.enableCors({
    origin: '*',
  });
  
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(3002);
}
bootstrap();
