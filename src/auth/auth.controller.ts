import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('权限校验')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 登录
  @Post('signin')
   @ApiBody({
    type: LoginDto,
    examples: {
      example1: {
        value: {
          username: 'string',
          email: 'john@example.com',
          password: 'password123'
        }
      }
    }
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
  @ApiBody({
    type: RegisterDto,
    examples: {
      example1: {
        value: {
          username: 'string',
          email: 'john@example.com',
          code: '111111'
        }
      }
    }
  })
  async signup(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    console.log(user);
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
