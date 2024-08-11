const { z } = require('zod');


const taskSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
  expiration: z.string().optional()
});


module.exports = {
  taskSchema,
};