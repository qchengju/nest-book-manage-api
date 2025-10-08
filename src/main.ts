import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from './config/swagger.config';
import { Logger } from '@nestjs/common';
import { getServerConfig } from './config/server.config';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  swaggerSetup(app);

  await app.listen(getServerConfig()?.SERVER_PORT ?? 3000);
  Logger.log(`nest-api已经部署在 ${getServerConfig()?.SERVER_PORT??3000} 端口上`);
}

bootstrap();
