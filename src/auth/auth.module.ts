import { Module, HttpModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import * as config from 'config';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    HttpModule.register({
      timeout: 5000,
      baseURL: config.get('server').host,
      headers: { Authorization: 'Basic YWRtaW46YWRtaW4=' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
