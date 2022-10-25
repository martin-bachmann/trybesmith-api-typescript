import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': '"username" is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': '"password" is required',
  }),
});

const loginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const validation = loginSchema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error.details[0].message });
  }
  next();
};

export default loginMiddleware;