import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response, Request, NextFunction } from 'express';
import { TokenBlacklistService } from '../auth/services';
import { BusinessException } from 'src/exception';
import { error } from 'console';

@Injectable()
export class TokenExistingMiddleware implements NestMiddleware {
  constructor() {} // private readonly tokenBlacklistService: TokenBlacklistService, // private readonly configService: ConfigService, // private readonly jwtService: JwtService,
  async use(request: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = request.body.accessToken;
      if (!accessToken) throw error;
    } catch (error) {
      throw new BusinessException(
        'invalid-token',
        'token is not exist',
        'token is not exist',
        HttpStatus.UNAUTHORIZED,
      );
    }

    next();
  }
}

// try{
// const accessToken = request.body.accessToken;
// const refreshToken = request.body.refreshToken;
// const [decordingAccess, decordingRefresh] = await Promise.all([
//   // 비동기 함수의 병렬처리를 위해서
//   this.jwtService.verifyAsync(accessToken, {
//     secret: this.configService.get<string>('JWT_SECRET'),
//   }),
//   this.jwtService.verifyAsync(refreshToken, {
//     secret: this.configService.get<string>('JWT_SECRET'),
//   }),
// ]);
// const [accessTokenInBlacklist, refreshTokenInBlacklist] =
//   await Promise.all([
//     this.tokenBlacklistService.isTokenBlacklisted(decordingAccess.jti),
//     this.tokenBlacklistService.isTokenBlacklisted(decordingRefresh.jti),
//   ]);

// if (accessTokenInBlacklist || refreshTokenInBlacklist) {
//   throw new error();
// }
// } catch (error) {
// throw new BusinessException(
//   'invalid-token',
//   'fail-token-validation',
//   'fail token validation',
//   HttpStatus.UNAUTHORIZED,
// );
// }
