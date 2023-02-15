import { AuthService } from './auth.service';
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  //   @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body('data') data: { email: string, password: string }) {
    console.log('data: ', data);
    return await this.authService.login(data);
  }
}