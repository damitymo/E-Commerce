import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/users/enum/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> { 
    const requiredRoles=this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);	
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const hasRole=()=>requiredRoles.some((role)=>user.roles?.includes(role));
    const valid=user?.roles 

    if (!valid) {
      throw new UnauthorizedException('You do not have permission to access this resource');
    }
    return valid;
  }
}
