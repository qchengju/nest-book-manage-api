import { Injectable } from '@nestjs/common';
import {Repository} from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './menu.entity';
@Injectable()
export class MenuService {
  constructor(
    private readonly menuRepository: Repository<Menu>,
  ) {}
  create(createMenuDto: CreateMenuDto) {
    return this.menuRepository.create(createMenuDto);
  }

  findAll() {
    return this.menuRepository.find();
  }

  findOne(id: number) {
    return this.menuRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.menuRepository.update(+id, updateMenuDto);
  }

  remove(id: number) {
    return this.menuRepository.delete(+id);
  }
}
