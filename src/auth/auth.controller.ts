import { Controller, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials';
import { GizmoUserLoginData } from './dto/user-login-data.gizmo';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('/login')
  login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<GizmoUserLoginData> {
    return this.authService.login(authCredentialsDto);
  }
}
