
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any; 
}

function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  
  const token = req.header('authorization') as string;
  if (!token) {
    const statusCode : number = 401;
    return res.status(statusCode).json({ error: 'Unauthorized' });
  }
  jwt.verify(token, 'secret_key', (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  });
}

module.exports = {authenticateToken}
