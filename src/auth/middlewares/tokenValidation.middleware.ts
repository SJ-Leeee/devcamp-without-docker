import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response, Request, NextFunction } from 'express';
import { TokenBlacklistService } from '../services';
import { BusinessException } from 'src/exception';

@Injectable()
export class TokenValidationMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenBlacklistService: TokenBlacklistService,
  ) {}
  async use(request: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = request.body.accessToken;
      const refreshToken = request.body.refreshToken;
      const [jtiAccess, jtiRefresh] = await Promise.all([
        // 비동기 함수의 병렬처리를 위해서
        this.jwtService.verifyAsync(accessToken, {
          secret: this.configService.get<string>('JWT_SECRET'),
        }),
        this.jwtService.verifyAsync(refreshToken, {
          secret: this.configService.get<string>('JWT_SECRET'),
        }),
      ]);
      console.log('미들웨어실행');
      const [accessTokenInBlacklist, refreshTokenInBlacklist] =
        await Promise.all([
          this.tokenBlacklistService.isTokenBlacklisted(jtiAccess.jti),
          this.tokenBlacklistService.isTokenBlacklisted(jtiRefresh.jti),
        ]);

      if (accessTokenInBlacklist || refreshTokenInBlacklist) {
        throw new BusinessException(
          'invalid-token',
          'token in blacklist',
          'token in blacklist',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      throw new BusinessException(
        'invalid-token',
        'fail-token-validation',
        'fail token validation',
        HttpStatus.UNAUTHORIZED,
      );
    }

    next();
  }
}
