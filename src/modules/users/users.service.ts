import { PrismaService } from 'prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { hash } from 'src/shared/services/bcrypt.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findOne(email: string): Promise<User | undefined> {
    return await this.prisma.user.findFirst({
      where: {
        email: email
      }
    });
  }
  async createUser(data: Prisma.UserCreateInput) {
    try {
      // process logic signup check if user exist
      const isUserExist = await this.prisma.user.findFirst({
        where: {
          email: data.email
        }
      });
      if (isUserExist) {
        throw new Error('Email is exist');
      }
      const userCreate = await this.prisma.user.create({
        data: {
          // username: data.email,
          email: data.email,
          password: hash(data.password),
          roles: data.roles,
        }
      });
      return {
        username: userCreate.email,
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  async getAllUsers() {
    try {
      return await this.prisma.user.findMany();
    } catch (err) {
      throw new Error(err);
    }
  }
}
