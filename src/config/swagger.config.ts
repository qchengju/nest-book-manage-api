import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerSetup = (app: INestApplication) => {

  // 1. 配置 Swagger 文档
  const config = new DocumentBuilder()
    .setTitle('NestJS 接口文档') // 文档标题
    .setDescription('这是一个使用 NestJS 开发，用于图书管理的 API 接口文档') // 文档描述
    .setVersion('1.0') // 文档版本
    .addTag('权限校验') // 添加标签（用于归类接口）
    .addTag('用户管理')
    .addTag('图书管理')
    .addBearerAuth() // 支持 JWT 认证（可选）
    .build();

  // 2. 生成 Swagger 文档
  const document = SwaggerModule.createDocument(app, config);

  // 3. 挂载 Swagger UI 到指定路径（默认 /api-docs）
  SwaggerModule.setup('api-docs', app, document);
};
