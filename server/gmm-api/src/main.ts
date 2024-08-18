import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NoticeService } from '@modules/notice/services/notice.service';
import { NoticeInterceptor } from '@shared/interceptors/notice.interceptor';
import { ConfigService } from '@nestjs/config';

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
    origin: ['https://dev.d1iefzjrnhcxdl.amplifyapp.com/en', 'https://stage.d1iefzjrnhcxdl.amplifyapp.com/en', 'https://main.d1iefzjrnhcxdl.amplifyapp.com/en'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

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
  app.useGlobalInterceptors(new NoticeInterceptor(noticeService,
      reflector));

  await app.listen(port);
}
bootstrap();
