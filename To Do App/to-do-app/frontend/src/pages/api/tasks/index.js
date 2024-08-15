import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function handler() {
    if (req.method === 'GET') {
        const tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
      } else if (req.method === 'POST') {   
   // Create a new task
   const { title } = req.body;
   const newTask = await prisma.task.create({
     data: { title },
   });
   res.status(201).json(newTask);
 } else {
   res.setHeader('Allow', ['GET', 'POST']);
   res.status(405).end(`Method ${req.method} Not Allowed`);
 }
}