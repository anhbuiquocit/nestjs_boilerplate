import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

import { hash, compare } from 'src/shared/services/bcrypt.service';
import { errorMonitor } from 'events';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) { }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  async login(user: { email: string, password: string }) {
    // Validate user in db
    try {
      if (!user) {
        throw new Error('Invalid user input');
      }
      const userFind = await this.prisma.user.findFirst({
        where: {
          email: user.email,
        }
      });

      if (!userFind || !compare(user.password, userFind.password)) {
        throw new Error('Username or password incorrect');
      }
      const payload = {
        email: userFind.email,
        sub: userFind.id,
        roles: userFind.roles,
      };
      return {
        access_token: this.jwtService.sign(payload),
        iat: Date.now(),
        roles: userFind.roles,
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}