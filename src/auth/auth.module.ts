import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  AccessLog,
  AccessToken,
  RefreshToken,
  TokenBlacklist,
  User,
} from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AccessLogRepository,
  AccessTokenRepository,
  RefreshTokenRepository,
  TokenBlacklistRepository,
  UserRepository,
} from './repositories';
import { AuthService, TokenBlacklistService, UserService } from './services';
import { AuthController } from './controllers';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenValidationMiddleware } from './middlewares/tokenValidation.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.local`,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRY'),
        },
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      AccessToken,
      RefreshToken,
      AccessLog,
      TokenBlacklist,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    TokenBlacklistService,

    UserRepository,
    AccessTokenRepository,
    RefreshTokenRepository,
    AccessLogRepository,
    TokenBlacklistRepository,
  ],
  exports: [
    UserService,
    AuthService,
    TokenBlacklistService,

    UserRepository,
    AccessTokenRepository,
    RefreshTokenRepository,
    AccessLogRepository,
    TokenBlacklistRepository,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenValidationMiddleware).forRoutes('auth/logout'); //users 경로에서 GET 요청에만 등록
  }
}
