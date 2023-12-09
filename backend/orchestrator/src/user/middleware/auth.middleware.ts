import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiAuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Extract the token from the response headers
    console.log('req.headers', req.headers);
    console.log('res.headers', res);

    const accessToken = res.get('Authorization');

    console.log('getting accessToken', accessToken);

    // Store the token in the request headers for further use
    req.headers['Authorization'] = accessToken;

    // Continue processing the request
    next();
  }
}
