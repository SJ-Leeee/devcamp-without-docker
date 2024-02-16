import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { BusinessException } from 'src/exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.body.accessToken;
      const decordingAccess = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      request.user = decordingAccess;
      return true;
    } catch (err) {
      throw new BusinessException(
        'invalid-token',
        'token is not available',
        'token is not available',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
