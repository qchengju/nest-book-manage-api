import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
  Body,
  Get,
  Put,
  Query,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BookService } from './book.service';
import { Roles } from '../decorator/role.decorator';
import { RoleEnum } from '../enum/role.enum';
import { JwtGuard } from '../guard/jwt.guard';
import { RoleGuard } from '../guard/role.guard';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './book.entity';
import { FindAllBookDto } from './dto/find-all-book.dto';

@Controller('book')
@ApiTags('图书管理')
@ApiSecurity('token')
@Roles(RoleEnum.Admin, RoleEnum.SuperAdmin)
@UseGuards(JwtGuard, RoleGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('addBook')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '添加图书' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bookName: { type: 'string', description: '图书名称' },
        author: { type: 'string', description: '作者' },
        description: { type: 'string', description: '描述' },
        publishTime: { type: 'string', format: 'date-time', description: '出版时间' },
        file: { type: 'string', format: 'binary', description: '封面图片' },
      },
      required: ['bookName', 'author'], // 指定必需字段
    },
  })
  @ApiResponse({ status: 200, description: '成功添加图书' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  async addBook(
    @Body() body: any,// 不对body的类型限制，以便文件拦截器可以正常生效
    @UploadedFile() file: Express.Multer.File
  ) {
    // 验证必要字段
    if (!body.bookName || !body.author) {
      throw new BadRequestException('图书名称和作者为必填项');
    }
    // 构建图书实体
    const bookDto: CreateBookDto = {
      bookName: body.bookName,
      author: body.author,
      description: body.description,
      publishTime: body.publishTime,
      imageCover: '', // 初始为空，稍后更新
    };

    try {
      const book = await this.bookService.create(bookDto as Book);

      if (file) {
        const updatedBook = await this.bookService.uploadCoverImage(book.id, file);
        book.imageCover = updatedBook.imageCover;
      }

      return {
        code: 200,
        message: '添加图书成功',
        data: book,
      };
    } catch (error) {
      throw new BadRequestException('添加图书失败: ' + error.message);
    }
  }

  @Get('findAllBook')
  @ApiOperation({ summary: '获取所有图书' })
  async findAllBook() {
    return await this.bookService.getAll();
  }

  @Post('findBook')
  @ApiOperation({ summary: '分页查询图书' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        page: {
          type: 'number',
          description: '页码',
        },
        pageSize: {
          type: 'number',
          description: '每页数量',
        },
        search: {
          type: 'string',
          description: '搜索关键词',
        },
      },
    },
  })
  async findBook(@Body() dto: FindAllBookDto) {
    return await this.bookService.findAll(dto);
  }

  @Put('updateBook/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '更新图书' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: '图书ID' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        bookName: { type: 'string', description: '图书名称' },
        author: { type: 'string', description: '作者' },
        description: { type: 'string', description: '描述' },
        publishTime: { type: 'string', format: 'date-time', description: '出版时间' },
        file: { type: 'string', format: 'binary', description: '封面图片' },
      },
    },
  })
  @ApiResponse({ status: 200, description: '成功更新图书' })
  @ApiResponse({ status: 400, description: '请求参数错误' })
  async updateBook(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any, // 使用 CreateBookDto 类型接收 body
    @UploadedFile() file: Express.Multer.File
  ) {
    const existingBook = await this.bookService.findOne(id);
    if (!existingBook) {
      throw new BadRequestException('没有找到对应的书籍');
    }
    const { bookName, author, description, publishTime } = body;
    const bookDto: CreateBookDto = {
      bookName: bookName || existingBook.bookName,
      author: author || existingBook.author,
      description: description || existingBook.description,
      publishTime: publishTime || existingBook.publishTime,
      imageCover: existingBook.imageCover,
    };

    try {
      const book = await this.bookService.update(id, bookDto as Book);

      if (file) {
        const updatedBook = await this.bookService.uploadCoverImage(id, file);
        updatedBook.imageCover = updatedBook.imageCover;
      }

      return {
        code: 200,
        message: '更新图书成功',
        data: null,
      };
    } catch (error) {
      throw new BadRequestException('更新图书失败: ' + error.message);
    }
  }

  @Delete('deleteBook')
  @ApiOperation({ summary: '删除图书' })
  @ApiParam({
    name: 'ids',
    required: true,
  })
  async deleteBook(@Query('ids') ids: number[]) {
    await this.bookService.remove(ids);
    return {
      code: 200,
      message: '删除图书成功',
      data: null,
    };
  }
}
