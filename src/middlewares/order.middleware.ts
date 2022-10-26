import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import statusCodes from '../statusCodes';

const orderSchema = Joi.object({
  productsIds: Joi.array().required().min(1).messages({
    'array.empty': '"productsIds" is required',
    'array.base': '"productsIds" must be an array',
    'array.min': '"productsIds" must include only numbers',
  }),
  user: Joi.object().required(),
});

const orderMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const validation = orderSchema.validate(req.body);
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

export default orderMiddleware;