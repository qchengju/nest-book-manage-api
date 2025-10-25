import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../enum/role.enum';
import { ROLES_KEY } from '../decorator/role.decorator';
import { UserService } from '../user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // jwt -> userId -> user -> roles
    // getAllAndMerge -> 合并 getAllAndOveride -> 读取路由上的metadata
    const requiredRoles = this.reflector.getAllAndMerge<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();

    // user -> roles -> menu -> CURD + M, C1,C2,C3
    const user = await this.userService.findOne(req.user.email);

    if (!user) {
      return false;
    }
    const roleIds = user.roles.map(o => o.id);

    const flag = requiredRoles.some(role => roleIds.includes(role));
    return flag;
  }
}
