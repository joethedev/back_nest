import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './gards/jwt-auth.guard';
import { JwtRefreshGuard } from './gards/jwt-refresh.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('token')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('account')
  async create(@Body() createDto: CreateUserDto) {
    return this.authService.create(
      createDto.email,
      createDto.username,
      createDto.firstname,
      createDto.password,
      createDto.role,
    );
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@Req() req: any) {
    return this.authService.refreshToken(
      req.user.userId,
      req.body.refreshToken,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: any) {
    return this.authService.logout(req.user.userId);
  }
}
