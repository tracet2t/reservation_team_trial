const request = require('supertest');
const express = require('express');
const app = require('./app.js');

describe('Test the /abc and /cba routes', () => {
  it('should respond with "Hello, World!" on GET /abc', async () => {
    const response = await request(app).get('/abc');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });

  it('should respond with "Hello, World!" on GET /cba', async () => {
    const response = await request(app).get('/cba');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, World!');
  });
});
