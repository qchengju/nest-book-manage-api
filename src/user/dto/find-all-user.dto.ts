import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class FindAllUserDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    description: '页码',
    required: false,
    default: 1,
  })
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    description: '每页数量',
    required: false,
    default: 10,
  })
  limit: number = 10;

  @IsOptional()
  @ApiProperty({
    description: '查询参数',
    required: false,
  })
  queryParameter: string = '';
}
