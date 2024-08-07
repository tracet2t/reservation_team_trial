const express = require('express');
const app = express();
const todosRouter = require('./routes/todos');

const PORT = 4000;

app.use(express.json());
app.use('/api/todos', todosRouter);

module.exports = app;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });