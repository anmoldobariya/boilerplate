import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { checkEnvVariables } from './common/utils/helper';
import { REQ_ENV } from './common/utils/constants';

async function bootstrap() {
  checkEnvVariables(REQ_ENV);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,PATCH,DELETE',
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT ?? 5000;
  await app.listen(port, () => {
    console.log(`🚀 Server is listening on port ${port}`);
  });
}
bootstrap();
