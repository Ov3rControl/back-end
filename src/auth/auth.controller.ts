import { Controller, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { AuthenticatedUserIdGizmo } from './dto/authenticated-userId.gizmo';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('/login')
  login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Observable<AuthenticatedUserIdGizmo> {
    return this.authService.login(authCredentialsDto);
  }
}
