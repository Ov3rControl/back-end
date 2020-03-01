import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger('UserRepository');

  async saveLoginData(username: string, userId: JwtPayload): Promise<void> {
    const user = new User();
    user.username = username;
    user.userId = +userId;

    try {
      await user.save();
      this.logger.verbose(`${username} data has been saved in the Database`);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username
        this.logger.warn(`${username} already exists in Database`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
