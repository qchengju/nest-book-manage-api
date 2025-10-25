// src/book/book.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { FileModule } from '../file/file.module'; // 导入文件模块
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    UserModule,
    FileModule, // 导入文件模块
    MulterModule.register({
      limits: { fileSize: 2 * 1024 * 1024 }, // 限制文件大小为2MB
    }),
  ],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService],
})
export class BookModule {}