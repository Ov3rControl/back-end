import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import {
  ValidationPipe,
  ValidationError,
  BadRequestException,
} from '@nestjs/common';

async function bootstrap() {
  const serverConfig = config.get('server');
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(errors[0].constraints);
      },
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
