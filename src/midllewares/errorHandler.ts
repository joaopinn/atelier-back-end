import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const message = err?.message || 'Erro interno';
  const status = err?.status || 500;
  res.status(status).json({ error: message });
}
