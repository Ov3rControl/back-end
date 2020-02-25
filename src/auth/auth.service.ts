import {
  Injectable,
  HttpService,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { AuthenticatedUserIdGizmo } from './dto/authenticated-userId.gizmo';

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
   * @returns {Observable<AuthenticatedUserIdGizmo>} user's userId,
   */

  login(
    authCredentialsDto: AuthCredentialsDto,
  ): Observable<AuthenticatedUserIdGizmo> {
    const { username, password } = authCredentialsDto;

    return this.http.get<any>(`users/${username}/${password}/valid`).pipe(
      map(response => {
        const userId: AuthenticatedUserIdGizmo =
          response.data.result.identity.userId; //Gizmo userId
        if (!response.data.result.result) {
          // result === 0 means Authenticated Successfully in Gizmo
          return userId;
        } else {
          return new UnauthorizedException().message;
        }
      }),
      catchError(() => {
        throw new RequestTimeoutException();
      }),
    );
  }
}
