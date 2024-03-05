import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  fullname: string;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  changedAt: Date;
}
