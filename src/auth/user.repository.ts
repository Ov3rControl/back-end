import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async saveLoginData(username: string, userId: JwtPayload): Promise<void> {
    const user = new User();
    user.username = username;
    user.userId = +userId;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        console.log(`${username} already exists in Database`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
