import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerSetup = (app: INestApplication) => {

  // 1. 配置 Swagger 文档
  const config = new DocumentBuilder()
    .setTitle('NestJS API') // 文档标题
    .setDescription('这是一个基于 NestJS 的 API 文档, 主要描述了一个图书管理系统') // 文档描述
    .setVersion('1.0') // 文档版本
    .addTag('权限校验') // 添加标签（用于归类接口）
    .addTag('身份管理')
    .addTag('用户管理')
    .addTag('图书管理')
    .addBearerAuth() // 支持 JWT 认证（可选）
    .build();

  // 2. 生成 Swagger 文档
  const document = SwaggerModule.createDocument(app, config);

  // 3. 挂载 Swagger UI 到指定路径（默认 /api-docs）
  SwaggerModule.setup('api-docs', app, document,{
    swaggerOptions: {
      docExpansion: 'none', // 控制是否展开所有文档
      persistAuthorization: true, // 保持授权信息
      tagsSorter: 'alpha',  // 按标签排序
    },
  });
};
