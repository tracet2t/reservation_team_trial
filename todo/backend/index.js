const express = require('express');
const app = express();
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);

let server;

if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = { app, server };