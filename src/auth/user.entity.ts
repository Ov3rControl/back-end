import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  Entity,
} from 'typeorm';
@Entity()
//@Unique(['userId, username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  username: string;

  @Column()
  profilePicture: string;
}
