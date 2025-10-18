import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  bookname: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({ type: 'timestamp' })
  publishTime: Date;

}
