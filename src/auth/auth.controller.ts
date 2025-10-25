import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
@ApiTags('权限校验')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录
  @Post('signin')
  @ApiOperation({ summary: '用户登录' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      example: {
        summary: '登录示例',
        value: {
          username: 'testuser',
          password: 'password',
          email: 'testuser@example.com',
        },
      },
    },
  })
  async signin(@Body() dto: LoginDto) {
    const { username, email, password } = dto;
    const token = await this.authService.login({ username, email, password });
    return {
      code: 200,
      message: '登录成功',
      data: {
        token,
      },
    };
  }

  // 注册
  @Post('signup')
  @ApiOperation({ summary: '用户注册' })
  @ApiBody({
    type: RegisterDto,
    examples: {
      example: {
        summary: '注册示例',
        value: {
          email: 'testuser@example.com',
          password: 'password',
          code: 123456,
        },
      },
    },
  })
  async signup(@Body() dto: RegisterDto): Promise<{ code: number; message: string; data: null }> {
    const user = await this.authService.register(dto);
    if (user) {
      return {
        code: 200,
        message: '注册成功',
        data: null,
      };
    }
    return {
      code: 500,
      message: '注册用户失败',
      data: null,
    };
  }
}
