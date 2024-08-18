import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const testRoute = async (req, res) => {
  // Just a simple text response for testing
  res.send("Hi");
};

export const store = async (req, res) => {
    const { title } = req.body
  try {
    res.status(201).json(title)
  } catch (error) {}
};
