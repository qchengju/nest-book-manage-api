import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
     { message: '邮箱格式不正确' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20, { message: '密码长度为6-20位' })
  password: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{6}$/, { message: '验证码格式不正确' })
  code: number;
}
