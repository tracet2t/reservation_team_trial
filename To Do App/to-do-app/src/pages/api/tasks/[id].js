import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function handler(req, res) {
    const { id } = req.query;
  
    if (req.method === 'GET') {
      const task = await prisma.task.findUnique({ where: { id: Number(id) } });
      res.status(200).json(task);
    } else if (req.method === 'PUT') {
      const { title, completed } = req.body;
      const updatedTask = await prisma.task.update({
        where: { id: Number(id) },
        data: { title, completed },
      });
      res.status(200).json(updatedTask);
    } else if (req.method === 'DELETE') {
      await prisma.task.delete({ where: { id: Number(id) } });
      res.status(204).end();
    }
  }