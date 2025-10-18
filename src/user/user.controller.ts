import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { FindAllUserDto } from './dto/find-all-user.dto';
import { AdminGuard } from '../guard/admin.guard';
import { JwtGuard } from '../guard/jwt.guard';

@Controller('user')
@ApiTags('用户管理')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('findAllUser')
  @ApiBody({
    type: FindAllUserDto,
    examples: {
      example: {
        summary: '查询用户列表',
        value: {
          page: 1,
          limit: 10,
          queryParameter: 'q',
        },
      }
    },
  })
  @UseGuards(AdminGuard)
  async findAllUser(@Body() dto: FindAllUserDto) {
    return await this.userService.findAll(dto);
  }
}
