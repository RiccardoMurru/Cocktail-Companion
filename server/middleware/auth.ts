import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare module 'express' {
  interface Request {
    username?: string;
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  let token = '';

  if (Array.isArray(authorization)) {
    token = authorization[0].split(' ')[1];
  } else {
    token = authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!decoded.username) {
      return res
        .status(401)
        .json({ message: 'Unauthorized - Missing username' });
    }

    req.username = decoded.username;

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized - Token expired' });
    }

    res.status(401).json({ message: 'Unauthorized' });
  }
}
