import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class FindAllBookDto {
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
