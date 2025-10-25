import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
     { message: '邮箱格式不正确' })
  @ApiProperty({ description: '邮箱' , example: '123456789@qq.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20, { message: '密码长度为6-20位' })
  @ApiProperty({ description: '密码', example: '123456789' })
  password: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{6}$/, { message: '验证码格式不正确' })
  @ApiProperty({ description: '验证码', example: '123456' })
  code: number;
}
