import { IsInt } from 'class-validator';

export class AuthenticatedUserIdGizmo {
  @IsInt()
  userId: number;
}
