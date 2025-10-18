import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';

// 判断是否是 admin 的守卫
@Injectable()
export class AdminGuard implements CanActivate {
  // 常见的错误：在使用AdminGuard未导入UserModule
  constructor(private userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {

    // 读取jwt中的用户信息
    const req = context.switchToHttp().getRequest();

    const user = await this.userService.findOne(req.user.username);

    if (user && user.roles.filter(role => role.id === 2 || role.id === 3).length > 0) {
      return true;
    }
    return false;
  }
}
