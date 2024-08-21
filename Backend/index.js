import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import TodoRoute from './routes/TodoRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// JSON data format
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/', TodoRoute);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    const details = err.error.details;
    const errors = details.map(detail => detail.message);
    return res.status(400).json({
      type: err.type,
      message: errors.join('\n'),
    });
  }
  res.status(500).send('Internal Server Error');
});

// Catch all route for undefined routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
