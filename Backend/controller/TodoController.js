import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all todos
export const getAll = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error retrieving todos:", error);
    res.status(500).json({ error: "Error retrieving todos" });
  }
};

// Create a new todo
export const store = async (req, res) => {
  const { title, dueDate, description, priority } = req.body;

  try {
    const newTodo = await prisma.todo.create({
      data: {
        title,
        dueDate: new Date(dueDate), // Ensure dueDate is in Date format
        description,
        priority,
      },
    });
    res.status(201).json({
      message: "Todo created successfully",
      todo: newTodo,
    });
  } catch (error) {
    console.error("Error storing data:", error);
    res.status(500).json({ error: "Error storing data" });
  }
};

// Find a todo by ID
export const findById = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.error("Error finding todo:", error);
    res.status(500).json({ error: "Error finding todo" });
  }
};

// Update a todo by ID
export const update = async (req, res) => {
  const { id } = req.params;
  const { title, dueDate, description, priority } = req.body;

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(id) },
      data: {
        title,
        dueDate: new Date(dueDate),
        description,
        priority,
      },
    });

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    if (error.code === "P2025") {
      // Prisma error code for record not found
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.status(500).json({ error: "Error updating todo" });
    }
  }
};

// Delete a todo by ID
export const deleteById = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.todo.delete({
      where: { id: Number(id) },
    });
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error("Error deleting todo:", error);
    if (error.code === "P2025") {
      // Prisma error code for record not found
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.status(500).json({ error: "Error deleting todo" });
    }
  }
};

