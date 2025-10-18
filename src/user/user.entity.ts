import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserProfile } from './user-profile.entity';
import { Role } from '../role/role.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => UserProfile, userProfile => userProfile.user, { cascade: true })
  @JoinColumn()
  userProfile: UserProfile;

  @ManyToMany(() => Role, role => role.users)
  @JoinTable({ name: 'user_role' })
  roles: Role[];
}
