import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor() {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const clientIp = request.ip;
    const endpoint = request.originalUrl;
    console.log(`IP: ${clientIp}, Endpoint: ${endpoint}`);

    return next.handle();
  }
}
