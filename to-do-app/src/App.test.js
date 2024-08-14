const express = require('express');
const request = require('supertest');
const mysql = require('mysql2/promise');

const app = express();

// Example route
app.get('/tasks', (req, res) => {
  res.status(200).json({ message: 'Tasks fetched successfully' });
});

describe('GET /tasks', () => {
  it('should return a success message', async () => {
    const response = await request(app).get('/tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Tasks fetched successfully');
  });
});
