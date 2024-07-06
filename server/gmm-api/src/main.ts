import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NoticeService } from '@modules/notice/services/notice.service';
import { NoticeInterceptor } from '@shared/interceptors/notice.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

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

  await app.listen(5000);
}
bootstrap();
