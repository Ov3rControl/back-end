import {
  Injectable,
  HttpService,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { GizmoUserLoginData } from './dto/user-login-data.gizmo';

@Injectable()
export class AuthService {
  public constructor(
    private readonly http: HttpService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
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
          const userId: number = response.data.result.identity.userId; //Gizmo userId
          return {
            message: `Welcome ${username}`,
            token: userId,
            username,
          };
        } else {
          return new UnauthorizedException().message;
        }
      })
      .catch(() => {
        throw new RequestTimeoutException();
      });
  }
}
