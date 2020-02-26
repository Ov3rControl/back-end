import { IsInt, IsString, MinLength, MaxLength, IsJWT } from 'class-validator';

export class GizmoUserLoginData {
  @IsInt()
  userId: number;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsJWT()
  token: string;
}