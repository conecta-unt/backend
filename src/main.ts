import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from 'src/bootstrap';
import { AppModule } from './app.module';
import { ErrorResponseNormalizerFilter } from './global/filters/error-response-normalizer.filter';
import { AppConfigService } from './global/services/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(AppConfigService);

  app.use(cookieParser());

  app.setGlobalPrefix(config.globalPrefix);
  app.useGlobalFilters(app.get(ErrorResponseNormalizerFilter));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: config.clients_url,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(config.port);
}

bootstrap().catch(handleError);

function handleError(error: unknown) {
  console.error(error);
  process.exit(1);
}

process.on('uncaughtException', handleError);
