import { Controller, Post, Body, Res, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, LogoutDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto, @Res() res) {
    const { email, password } = dto;
    console.log('Received login request for email:', email); // Debugging log
    const token = await this.authService.login(email, password);
    res.cookie('jwt', token, { httpOnly: true });
    return res.json({ message: 'Login successful', token }); // Return token in response
  }

  @Post('logout')
  @HttpCode(200)
  async logout(@Body() dto: LogoutDto, @Res() res) {
    res.clearCookie('jwt');
    return { message: 'Logout successful' };
  }
}
