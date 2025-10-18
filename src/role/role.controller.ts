import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RoleService } from './role.service';

@Controller('role')
@ApiTags('身份管理')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

}
