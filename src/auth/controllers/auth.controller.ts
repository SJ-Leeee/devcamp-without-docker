import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, UserService } from '../services';
import { CreateUserDto, LoginReqDto, LoginResDto } from '../dto';
import { User } from '../entities';
import { RefreshReqDto } from '../dto/refresh-req.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginReqDto: LoginReqDto): Promise<LoginResDto> {
    return this.authService.login(loginReqDto.email, loginReqDto.password);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshReqDto): Promise<string> {
    return this.authService.refreshAccessToken(dto.refreshToken);
  }
}
