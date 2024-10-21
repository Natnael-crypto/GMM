import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { TransactionInterceptor } from '@shared/interceptors/transaction.interceptor';
import { DataSource } from 'typeorm';
import { LoggerFactory } from '@shared/utils/logger';

async function bootstrap() {
  const winstonLogger = LoggerFactory('Guardian/Wali');

  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: '*',
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new TransactionInterceptor(app.get(DataSource)));

  const config = new DocumentBuilder()
    .setTitle('Guardian / Wali Documentation')
    .setDescription('Guardian / Wali API')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('GMM')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
