import {
  Injectable,
  HttpService,
  RequestTimeoutException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { GizmoUserLoginData } from './dto/user-login-data.gizmo';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  public constructor(
    private readonly http: HttpService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  /**
   * @param {object} AuthCredentialsDto - user's identifications.
   * @param {string} AuthCredentialsDto.username - user's username.
   * @param {string} AuthCredentialsDto.password - user's password.
   * @returns {Promise<GizmoUserLoginData>} user's userId,
   */

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<GizmoUserLoginData> {
    const { username, password } = authCredentialsDto;

    return this.http
      .get<any>(`users/${username}/${password}/valid`)
      .toPromise()
      .then(response => {
        if (!response.data.result.result) {
          // result === 0 means Authenticated Successfully in Gizmo
          const userId: JwtPayload = response.data.result.identity.userId; //Gizmo userId
          const accessToken = this.jwtService.sign(userId);
          return {
            message: `Welcome ${username}`,
            accessToken,
            username,
          };
        } else {
          return new UnauthorizedException().message;
        }
      })
      .catch(error => {
        const errorStatusCode = error.response.status;
        switch (errorStatusCode) {
          case 401:
            throw new UnauthorizedException();
          case 500:
            throw new InternalServerErrorException();
          default:
            throw new RequestTimeoutException();
        }
      });
  }
}
