import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity()
//@Unique(['userId, username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: number;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  profilePicture: string;
}
