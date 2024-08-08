const { z } = require('zod');

const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  dueDate: z.string().optional().refine(date => !isNaN(Date.parse(date)), {
    message: "Invalid due date format",
  }),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).optional(),
});

module.exports = {
  taskSchema,
};