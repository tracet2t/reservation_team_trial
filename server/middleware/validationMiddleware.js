// /middleware/validationMiddleware.js
import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validator = createValidator({});

const userSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': 'Title should be a type of text',
    'string.empty': 'Title cannot be an empty field',
    'any.required': 'Title is a required field'
  }),
  dueDate: Joi.date().required().messages({
    'date.base': 'Due Date should be a valid date',
    'date.empty': 'Due Date cannot be an empty field',
    'any.required': 'Due Date is a required field'
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description should be a type of text',
    'string.empty': 'Description cannot be an empty field',
    'any.required': 'Description is a required field'
  }),
  priority: Joi.string().valid('low', 'medium', 'high').required().messages({
    'string.base': 'Priority should be a type of text',
    'any.only': 'Priority must be one of [low, medium, high]',
    'string.empty': 'Priority cannot be an empty field',
    'any.required': 'Priority is a required field'
  })
});

const validateUser = validator.body(userSchema);

export { validateUser };
