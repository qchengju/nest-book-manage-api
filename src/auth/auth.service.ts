import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { VerificationService } from '../mail/verification.service';
import { JwtService } from '@nestjs/jwt';

import { RegisterDto } from './dto/register.dto';
import { User } from '../user/user.entity';
import { LoginDto } from './dto/login.dto';

import { RoleEnum } from '../enum/role.enum';

import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly verificationService: VerificationService,
    private readonly userServie: UserService,
    private readonly jwtService: JwtService
  ) {}

  // 注册
  async register(dto: RegisterDto) {
    const { email, password, code } = dto;
    // 先进行基础参数校验
    if (!email || !code) {
      throw new HttpException('邮箱和验证码均为必填项', HttpStatus.BAD_REQUEST);
    }

    // 用户存在性检查
    const user = await this.userServie.findOne(email);
    if (user) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    const isCodeValid = await this.verificationService.verifyCode(email, String(code));
    if (!isCodeValid) {
      throw new HttpException('注册信息无效', HttpStatus.BAD_REQUEST);
    }

    const tempUser = new User();
    tempUser.username = email;
    tempUser.email = email;
    tempUser.password = await argon2.hash(password);
    tempUser.roles = [{
      id: RoleEnum.User, name: 'User',
      users: [],
      menus: []
    }];

    return await this.userServie.create(tempUser);
  }

  // 登录
  async login(dto: LoginDto) {
    const { username, email, password } = dto;

    const option = username || email;

    if (!option) {
      throw new HttpException('用户名或邮箱必须提供一个', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userServie.findOne(option);

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    if (!(await argon2.verify(user.password, password))) {
      throw new HttpException('账号或者密码错误', HttpStatus.BAD_REQUEST);
    }

    return await this.jwtService.signAsync({
      username: user.username,
      email: user.email,
      sub: user.id,
    });
  }
}
