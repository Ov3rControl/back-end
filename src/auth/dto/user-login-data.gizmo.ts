import { IsString, MinLength, MaxLength, IsJWT } from 'class-validator';

export class GizmoUserLoginData {
  @IsString()
  message: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsJWT()
  token: string;
}
