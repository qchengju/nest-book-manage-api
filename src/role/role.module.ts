import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Role]), UserModule],
    controllers: [RoleController],
    providers: [RoleService],
})
export class RoleModule {}
