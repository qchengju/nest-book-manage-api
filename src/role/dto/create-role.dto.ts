import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 10, {
    message: '角色名称长度应在2到10个字符之间',
  })
  @ApiProperty({
    description: '角色名称',
    example: 'User',
  })
  name: string;
}
