const express = require('express');
const app = express();

// routes
const todosRouter = require('./routes/todos');
const authRoutes = require('./routes/auth');



const PORT = 5000;

app.use(express.json());

app.use('/api/v1/', todosRouter);
app.use('/api/v1/auth', authRoutes);

module.exports = app;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });