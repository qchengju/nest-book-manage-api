import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

import { NotFoundException } from '@nestjs/common';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}

  async create(role: Pick<Role, 'name'>): Promise<Role> {
    return this.roleRepository.save(role);
  }

  findAll() {
    return this.roleRepository.find();
  }

  findOne(id: number) : Promise<Role | null> {
    return this.roleRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateRoleDto: Partial<Pick<Role, 'name'>>) {
    const role = await this.findOne(id);
    if (!role) {
      throw new NotFoundException(`权限 ${id} 未发现`);
    }
    const newRole = this.roleRepository.merge(role, updateRoleDto);
    return this.roleRepository.save(newRole);
  }

  remove(id: number) {
      return this.roleRepository.delete(id);
  }
}
