import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NoticeService } from '@modules/notice/services/notice.service';
import { NoticeInterceptor } from '@shared/interceptors/notice.interceptor';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  const config = new DocumentBuilder()
    .setTitle('Guardian / Wali Documentation')
    .setDescription('Guardian / Wali API')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('GMM')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const noticeService = app.get(NoticeService);
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new NoticeInterceptor(noticeService, reflector));

  await app.listen(port);
}
bootstrap();
