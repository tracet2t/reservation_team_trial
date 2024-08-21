import { z } from 'zod';

export const TodoSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  dueDate : z.string().min(1, { message: "Due date is required" }),
});
