import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../user/user.entity';
import { Expose } from 'class-transformer';
import { Menu } from '../menu/menu.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  @Expose()
  users: User[];

  @ManyToMany(() => Menu, (menu) => menu.roles)
  @JoinTable({name:"role_menu"})
  menus: Menu[];
}
