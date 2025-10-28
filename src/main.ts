import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from './config/swagger.config';
import { ClassSerializerInterceptor,Logger, ValidationPipe } from '@nestjs/common';
import { getServerConfig,getCurrentDir } from './config/server.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  swaggerSetup(app);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(getServerConfig()?.SERVER_PORT ?? 3000);
  Logger.log(`nest-api已经部署在 ${getServerConfig()?.SERVER_PORT ?? 3000} 端口上`);
  Logger.error('物是人非事事休，欲语泪先流.');
}
bootstrap();
