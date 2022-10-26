import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().required().min(3).messages({
    'string.empty': '"name" is required',
    'string.base': '"name" must be a string',
    'string.min': '"name" length must be at least 3 characters long',
  }),
  amount: Joi.string().required().min(3).messages({
    'string.empty': '"amount" is required',
    'string.base': '"amount" must be a string',
    'string.min': '"amount" length must be at least 3 characters long',
  }),
});

const productMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const validation = productSchema.validate(req.body);
  if (validation.error) {
    if (validation.error.details[0].message.match(/required/)) {
      return res.status(400).json({ message: validation.error.details[0].message });
    } 
    return res.status(422).json({ message: validation.error.details[0].message });
  }
  next();
};

export default productMiddleware;