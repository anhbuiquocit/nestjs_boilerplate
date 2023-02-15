import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UseGuards,  } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleType } from 'src/common/constants/role-type';
import { RolesGuard } from '../auth/roles.guard';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Post('signup')
    async signup(@Body('data') data: { email: string, password: string, roles: string }) {
        console.log('dataa signup', data);
        return await this.usersService.createUser(data);
    }


    @UseGuards(JwtAuthGuard)
    @Roles(RoleType.ADMIN)
    @UseGuards(RolesGuard)
    @Get('all_users')
    async getAllUser(){
        return this.usersService.getAllUsers();
    }
}