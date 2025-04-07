import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CustomException } from '../exceptions/custom.exception';
import { ERROR_MSG } from '../utils/constants';

@Injectable()
export class CheckPermissionGuard implements CanActivate {
  constructor(private readonly screen: string) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user.permissions.some((p) => p.screen === this.screen && p.value))
      throw new CustomException(ERROR_MSG.UNAUTHORIZED);

    return true;
  }
}
