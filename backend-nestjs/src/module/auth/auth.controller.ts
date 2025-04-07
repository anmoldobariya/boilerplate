import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, UpdateUserDto } from './dto';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get('profile')
  profile(@CurrentUser() user: Partial<User>) {
    return this.authService.profile(user);
  }

  @Put('update')
  update(@Body() body: UpdateUserDto, @CurrentUser() user: Partial<User>) {
    return this.authService.update(body, user.id as number);
  }
}
