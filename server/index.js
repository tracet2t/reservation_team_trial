import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import TodoRoute from "./routes/TodoRoute.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// JSON data format
app.use(express.json()); // Add parentheses here
app.use(cors());

app.use('/api/v1/',TodoRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`server listening to port : ${PORT}`);
});
