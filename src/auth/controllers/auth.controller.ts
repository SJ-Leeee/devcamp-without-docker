import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService, UserService } from '../services';
import { CreateUserDto, LoginReqDto, LoginResDto } from '../dto';
import { User } from '../entities';
import { RefreshReqDto } from '../dto/refresh-req.dto';
import { RefreshResDto } from '../dto/refresh-res.dto';
import { LoggingInterceptor } from 'src/interceptors/accessLog.interceptor';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guards';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseInterceptors(LoggingInterceptor)
  @Post('login') // 주요키를 지정하지 않을경우 mysql은 자동증가정수 혹은 uuid를 만든다.
  async login(@Body() loginReqDto: LoginReqDto): Promise<LoginResDto> {
    return this.authService.login(loginReqDto.email, loginReqDto.password);
  }

  @Post('signup') // 유저 검증 후 리턴
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout') // 토큰검증 미들웨어
  async logout(@Body() tokenDto: LoginResDto) {
    return this.authService.logout(tokenDto.accessToken, tokenDto.refreshToken);
  }

  @Post('refresh') // 프론트에서 인터셉터를 이용해 액세스토큰을 재발급해주는 api
  async refresh(@Body() dto: RefreshReqDto): Promise<RefreshResDto> {
    return this.authService.refreshAccessToken(dto.refreshToken);
  }
}
