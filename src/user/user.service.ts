import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, MoreThanOrEqual } from 'typeorm';
import { User } from './user.entity';
import { FindAllUserDto } from './dto/find-all-user.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  // 创建用户
  async create(user: User) {
    const midUser = await this.userRepository.create(user);
    midUser.password = await argon2.hash(midUser.password); // 密码加密
    return await this.userRepository.save(midUser);
  }

  // 删除用户
  delete(id: number) {
    return this.userRepository.delete(id);
  }

  // 更新用户
  update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  // 查询所有用户 分页 + 模糊查询

  async findAll(dto: FindAllUserDto) {
    const { page, limit, queryParameter } = dto;
    const whereConditions = [
      { username: Like(`%${queryParameter}%`) },
      { email: Like(`%${queryParameter}%`) },
      { userProfile: { age: MoreThanOrEqual(Number(queryParameter) || 0) } },
      { userProfile: { gender: Like(`%${queryParameter}%`) } },
    ];

    const [list, total] = await this.userRepository.findAndCount({
      where: whereConditions,
      skip: (page - 1) * limit,
      take: limit,
      relations: ['userProfile', 'roles'],
    });
    return {
      list,
      total,
    };
  }

  // 查询用户，查询在数据库中是否存在
  async findOne(option: string | number) {
    if (typeof option === 'string') {
      return await this.userRepository.findOne({
        where: [{ username: option }, { email: option }],
        relations: ['userProfile', 'roles'],
      });
    }
    if (typeof option === 'number') {
      return await this.userRepository.findOne({
        where: { id: option },
        relations: ['userProfile', 'roles'],
      });
    }
    return null;
  }
}
