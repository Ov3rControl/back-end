import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      //disableErrorMessages: true,
      // forbidNonWhitelisted: true,
      // whitelist: true,
    }),
  );
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
  }
  app.setGlobalPrefix('api');
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
}
bootstrap();
