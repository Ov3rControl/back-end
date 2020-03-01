import { Controller, Body, Get, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { GizmoUserLoginData } from './dto/user-login-data.gizmo';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger('AuthController');

  constructor(private readonly authService: AuthService) {}
  @Get('/login')
  login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<GizmoUserLoginData> {
    this.logger.verbose(
      `User "${authCredentialsDto.username}" is trying to login.`,
    );
    return this.authService.login(authCredentialsDto);
  }
}
