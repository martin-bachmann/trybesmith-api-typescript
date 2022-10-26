import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import statusCodes from '../statusCodes';

const userSchema = Joi.object({
  username: Joi.string().required().min(3).messages({
    'string.empty': '"username" is required',
    'string.base': '"username" must be a string',
    'string.min': '"username" length must be at least 3 characters long',
  }),
  classe: Joi.string().required().min(3).messages({
    'string.empty': '"classe" is required',
    'string.base': '"classe" must be a string',
    'string.min': '"classe" length must be at least 3 characters long',
  }),
  level: Joi.number().required().min(1).messages({
    'number.empty': '"level" is required',
    'number.base': '"level" must be a number',
    'number.min': '"level" must be greater than or equal to 1',
  }),
  password: Joi.string().required().min(8).messages({
    'string.empty': '"password" is required',
    'string.base': '"password" must be a string',
    'string.min': '"password" length must be at least 8 characters long',
  }),
});

const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const validation = userSchema.validate(req.body);
  if (validation.error) {
    if (validation.error.details[0].message.match(/required/)) {
      return res.status(statusCodes.BAD_REQUEST).json({ 
        message: validation.error.details[0].message });
    } 
    return res.status(statusCodes.UNPROCESSABLE_ENTITY).json({ 
      message: validation.error.details[0].message });
  }
  next();
};

export default userMiddleware;