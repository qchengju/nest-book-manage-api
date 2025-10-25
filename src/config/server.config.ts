import dotenv from 'dotenv';
import { ConfigEnum } from '../enum/config.enum';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const getServerConfig = ()=>{
return dotenv.config().parsed
}

export const getDatabaseConfig = (): TypeOrmModuleOptions => {
  const config = getServerConfig(); // 正确调用函数

  return {
    type: config?.[ConfigEnum.DB_TYPE] as any, // 使用可选链和正确的属性访问
    host: config?.[ConfigEnum.DB_HOST],
    port: parseInt(config?.[ConfigEnum.DB_PORT] as string), // 将端口字符串转换为数字
    username: config?.[ConfigEnum.DB_USERNAME],
    password: config?.[ConfigEnum.DB_PASSWORD],
    database: config?.[ConfigEnum.DB_DATABASE],
  // 优先匹配 .ts 然后 .js；在 ts-node 环境下确保能找到 .ts 文件
  entities: [__dirname + '/../**/*.entity{.js,.ts}'], // 调整路径匹配模式
    // 同步本地的schema与数据库 -> 初始化的时候去使用
    synchronize: true,
  }
};

export const getCurrentDir = () => {
  console.log(join(__dirname, '../../'));
  return join(__dirname, '../../');
}