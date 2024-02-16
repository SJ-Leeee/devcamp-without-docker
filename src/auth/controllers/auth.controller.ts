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

  @Post('login') // 주요키를 지정하지 않을경우 mysql은 자동증가정수 혹은 uuid를 만든다.
  async login(@Body() loginReqDto: LoginReqDto): Promise<LoginResDto> {
    return this.authService.login(loginReqDto.email, loginReqDto.password);
  }

  @Post('signup') // 첫번째
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('logout')
  async logout(@Body() LogoutDto: LoginResDto) {
    return this.authService.logout(
      LogoutDto.accessToken,
      LogoutDto.refreshToken,
    );
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshReqDto): Promise<string> {
    return this.authService.refreshAccessToken(dto.refreshToken);
  }
}
