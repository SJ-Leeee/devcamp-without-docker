import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class TokenValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {}
}
