import { JwtService } from '@nestjs/jwt';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { RoleType } from 'src/common/constants/role-type';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        const { headers } = context.switchToHttp().getRequest();
        if (!requiredRoles) {
            return true;
        }
        if (!headers.authorization || headers.authorization && headers.authorization.split(' ').length < 2) {
            return false
        }
        const jwt = headers.authorization.split(' ')[1];
       
        console.log('jwt: ', jwt);
        const payload = this.jwtService.decode(jwt);
        console.log('payload: ', payload);
        return requiredRoles.some((role) => payload['roles']?.includes(role));
    }
}