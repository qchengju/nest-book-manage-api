import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @Length(6, 20, { message: '用户名长度为6-20位' })
  @ApiProperty({ description: '用户名', required: false })
  username: string;

  @IsString()
  @Length(6, 20, { message: '密码长度为6-20位' })
  @ApiProperty({ description: '密码' })
  password: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, { message: '邮箱格式不正确' })
  @ApiProperty({ description: '邮箱' })
  email: string;
}
