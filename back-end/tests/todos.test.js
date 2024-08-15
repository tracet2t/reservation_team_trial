const request = require('supertest');

const app = require('../app');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jwt = require('jsonwebtoken');


const SECRET_KEY = process.env.JWT_SECRET

let token;
let userId;


beforeAll(async () => {
await prisma.todo.deleteMany();
await prisma.user.deleteMany();

const user = await prisma.user.create({
  data: {
    email: 'testuser@t2t.com',
    password: 'testpassword', 
  },
});
userId = user.id
token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
});

afterAll(async () => {
await prisma.todo.deleteMany();
await prisma.user.deleteMany();
});



describe('POST /api/v1/todos', () => {
  it('should create a new todo', async () => {
    const newTodo = { title: 'Test Todo', description: 'Test description' };
    const response = await request(app)
      .post('/api/v1/todos')
      .set('Authorization', `Bearer ${token}`)
      .send(newTodo);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newTodo.title);

    const todos = await prisma.todo.findMany();
    expect(todos[0].title).toBe(newTodo.title);
    expect(todos[0].description).toBe(newTodo.description);
  });
});

describe('GET /api/v1/todos', () => {
  it('should return a list of todos', async () => {
    const response = await request(app)
      .get('/api/v1/todos')
      .set('Authorization', `Bearer ${token}`);
      
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe('PUT /api/v1/todos/:id', () => {
  it('should update a todo', async () => {
    const newTodo = { title: 'Todo to Update', description: 'Update description' };
    const createdTodo = await prisma.todo.create({
      data: { ...newTodo, userId: userId }, 
    });
    const updatedTodo = { title: 'Updated Todo', description: 'Updated description' };

    const response = await request(app)
      .put(`/api/v1/todos/${createdTodo.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedTodo);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(updatedTodo.title);
  });
});

describe('DELETE /api/v1/todos/:id', () => {
  it('should delete a todo', async () => {
    const todo = await prisma.todo.create({
      data: { title: 'Todo to Delete', description: 'Delete description', userId },
    });

    const response = await request(app)
      .delete(`/api/v1/todos/${todo.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Task deleted successfully');

    const todos = await prisma.todo.findMany();
    expect(todos).not.toContainEqual(expect.objectContaining({ id: todo.id }));
  });
});

describe ('PATCH /api/v1/todos/:id/toggle', () => {
  it('should toggle the completed status of a todo', async () => {
    const todo = await prisma.todo.create({
      data: { title: 'Todo to Toggle', description: 'Toggle description', completed: false, userId },
    });

    const response = await request(app)
      .patch(`/api/v1/todos/${todo.id}/toggle`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.completed).toBe(true); 
  });
});

describe('GET /api/v1/todos/search', () => {
  it('should search for todos by title or description', async () => {
    await prisma.todo.create({
      data: { title: 'Searchable Todo', description: 'Search description', userId },
    });

    const response = await request(app)
      .get('/api/v1/todos/search?q=Searchable')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].title).toBe('Searchable Todo');
  });
});