import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(`Se ejecuto el controlador ${req.url} en la ruta ${req.path} el fecha ${new Date()}`);
    
    next();
  }
}

export function loggerGlobal (req: Request, res: Response, next: () => void) {
  console.log(`Se ejecuto el controlador ${req.url} en la ruta ${req.path} en fecha ${new Date()}`);
  next();
}
