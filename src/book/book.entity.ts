import { Column, Entity,  PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column({ unique: true })
  bookName: string;

  @Column()
  description: string;

  @Column()
  imageCover: string;

  @Column({ type: 'timestamp' })
  publishTime: Date;

}
