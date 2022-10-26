import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User from '../interfaces/user.interface';
import 'dotenv/config';
import statusCodes from '../statusCodes';

const secret: string = process.env.JWT_SECRET || 'seusecretdetoken';

const generateToken = (user: User): string => {
  const payload = { id: user.id, name: user.username };
  const token = jwt.sign(payload, secret);
  return token;
};

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    
    req.body.user = decoded as JwtPayload;
    next();
  } catch (err) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
  }
};

export { generateToken, validateJWT };