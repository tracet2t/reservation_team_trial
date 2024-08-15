const { z } = require('zod');


const taskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
  expiration: z.null().optional(),
  completed: z.boolean().optional()
});

const registerSchema = z.object({
  name: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

module.exports = {
  taskSchema, registerSchema, loginSchema
};