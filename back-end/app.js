const express = require('express');
const app = express();

// routes
const todosRouter = require('./routes/todos');
const authRoutes = require('./routes/auth');

const cors = require('cors');

const PORT = 5150;

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(express.json());

app.use('/api/v1/', todosRouter);
app.use('/api/v1/auth', authRoutes);

module.exports = app;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });