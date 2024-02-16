import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, UserService } from '../services';
import { CreateUserDto, LoginReqDto, LoginResDto } from '../dto';
import { User } from '../entities';
import { RefreshReqDto } from '../dto/refresh-req.dto';
import { RefreshResDto } from '../dto/refresh-res.dto';

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

  @Post('signup') // 유저 검증 후 리턴
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('logout') // 토큰이 변조된 경우 생각
  async logout(@Body() LogoutDto: LoginResDto) {
    return this.authService.logout(
      LogoutDto.accessToken,
      LogoutDto.refreshToken,
    );
  }

  @Post('refresh') // 프론트에서 인터셉터를 이용해 액세스토큰을 재발급해주는 api
  async refresh(@Body() dto: RefreshReqDto): Promise<RefreshResDto> {
    return this.authService.refreshAccessToken(dto.refreshToken);
  }
}
