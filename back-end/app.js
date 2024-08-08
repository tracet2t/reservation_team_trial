const express = require('express');
const app = express();

// routes
const todosRouter = require('./routes/todos');


const PORT = 5000;

app.use(express.json());

app.use('/', todosRouter);

module.exports = app;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });