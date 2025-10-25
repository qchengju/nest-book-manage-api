import { Body, Controller, Delete, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtGuard } from '../guard/jwt.guard';
import { RoleGuard } from '../guard/role.guard';
import { Roles } from '../decorator/role.decorator';
import { RoleEnum } from '../enum/role.enum';

import { FindAllUserDto } from './dto/find-all-user.dto';
import {  CreateUserDto} from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('user')
@ApiTags('用户管理')
@ApiSecurity('token')
@Roles(RoleEnum.Admin, RoleEnum.SuperAdmin)
@UseGuards(JwtGuard, RoleGuard)
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
  async findAllUser(@Body() dto: FindAllUserDto) {
    return await this.userService.findAll(dto);
  }

  @Post('createUser')
   @ApiBody({
    type: CreateUserDto,
    examples: {
      example: {
        summary: '创建用户',
        value: {
          username: 'testuser',
          password: 'password',
          email: 'test@example.com',
        },
      }
    },
  })
  async createUser(@Body() dto: CreateUserDto) {
    const user =  new User();
    user.username = dto.username;
    user.password = dto.password;
    user.email = dto.email;
    const result = await this.userService.create(user);
    console.log('创建用户结果：', result);
    return {
      message: '用户创建成功',
      data: result,
      code: 200
    };
  }

  @Put('updateUser')
  @ApiBody({
    type: CreateUserDto,
    examples: {
      example: {
        summary: '更新用户',
        value: {
          username: 'testuser',
          password: 'password',
          email: 'test@example.com',
        },
      }
    },
  })
  async updateUser(@Body() dto: UpdateUserDto & { id: number }) {
    const { username, password, email, id } = dto;
    // 假设通过 email 查找用户

    const user = await this.userService.findOne(id);
    if (!user) {
      return {
        message: '用户不存在',
        code: 404
      };
    }
    const updatedUser = {
      username,
      password,
      email
    };
    const result = await this.userService.update(user.id, updatedUser);
    console.log('更新用户结果：', result);
    return {
      message: '用户更新成功',
      data: result,
      code: 200
    };
  }

  @Delete('deleteUser')
  async deleteUser(@Query('ids') ids:number[] ) {
    if (!Array.isArray(ids) || ids.length === 0) {
      return {
        message: '请传入要删除的用户ID',
        code: 400
      };
    }
    const result = await this.userService.delete(ids);
    console.log('删除用户结果：', result);
    return {
      message: '用户删除成功',
      data: result,
      code: 200
    };
  }

}
