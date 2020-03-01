import { Module, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as config from 'config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    HttpModule.register({
      timeout: 5000,
      baseURL: config.get('server').host,
      headers: config.get('authorization'),
    }),
    JwtModule.register({
      secret: config.get('jwt').secret,
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
