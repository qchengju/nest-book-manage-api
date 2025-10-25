// src/book/book.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Book } from './book.entity';
import { FindAllBookDto } from './dto/find-all-book.dto';
import { FileService } from '../file/file.service'; // 引入文件服务

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    private readonly fileService: FileService, // 注入文件服务
  ) {}

  async create(book: Book): Promise<Book> {
    return this.bookRepository.save(book);
  }

  async getAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findAll(dto: FindAllBookDto) {
    const { page, limit, queryParameter } = dto;
    const whereConditions = [
      { bookName: Like(`%${queryParameter}%`) },
      { author: Like(`%${queryParameter}%`) },
    ];
    const [list, total] = await this.bookRepository.findAndCount({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      page,
      total,
      list
    };
  }

  async findOne(id: number) {
    return this.bookRepository.findOneBy({ id });
  }

  async update(id: number, book: Partial<Book>) {
    return this.bookRepository.update(id, book);
  }

  async remove(ids: number[]) {
    // 可以考虑同时删除关联的封面文件
    for (const id of ids) {
      const book = await this.bookRepository.findOneBy({ id });
      if (book && book.imageCover) {
        this.fileService.deleteFile(book.imageCover);
      }
    }
    return this.bookRepository.delete(ids);
  }

  // 更新上传封面的方法
  async uploadCoverImage(bookId: number, file: Express.Multer.File): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id: bookId });
    if (!book) {
      throw new Error('没有有找到对应的书籍');
    }

    // 如果已有封面，先删除旧文件
    if (book.imageCover) {
      this.fileService.deleteFile(book.imageCover);
    }

    // 保存新文件
    const fileName = this.fileService.generateUniqueFileName(`book-${bookId}-cover-${file.originalname}`);
    const filePath = this.fileService.saveFile(file, fileName);

    // 更新数据库中的路径
    book.imageCover = filePath;
    return this.bookRepository.save(book);
  }
}