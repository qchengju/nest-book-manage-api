import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';

import { UpdateRoleDto } from './dto/update-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';

import { Roles } from '../decorator/role.decorator';
import { RoleEnum } from '../enum/role.enum';
import { JwtGuard } from '../guard/jwt.guard';
import { RoleGuard } from '../guard/role.guard';

@Controller('role')
@ApiTags('身份管理')
@ApiSecurity('token')
@Roles(RoleEnum.SuperAdmin)
@UseGuards(JwtGuard, RoleGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('createRole')
  @ApiBody({
    type: CreateRoleDto,
    examples: {
      example: {
        summary: '创建角色',
        value: {
          name: 'NewRole',
        },
      },
    },
  })
  async createRole(@Body() dto: CreateRoleDto) {
    return this.roleService.create({ name: dto.name });
  }

  @Get('findAllRole')
  async findAllRole() {
    return this.roleService.findAll();
  }

  @Put('updateRole')
  @ApiBody({
    type: UpdateRoleDto,
    examples: {
      example: {
        summary: '更新角色',
        value: {
          name: 'UpdateRole',
        },
      },
    },
  })
  async updateRole(@Body() dto: UpdateRoleDto & { id: number }) {
    return this.roleService.update(dto.id, { name: dto.name });
  }

  @Delete('deleteRole')
  async deleteRole(@Query('id') id: number) {
    return this.roleService.remove(id);
  }
}
