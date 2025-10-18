import { Entity, ManyToMany, OneToOne } from "typeorm";
import { PrimaryGeneratedColumn,Column } from "typeorm";
import { User } from "./user.entity";
@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column()
  age: number;

  @OneToOne(()=> User, user => user.userProfile)
  user: User;
}