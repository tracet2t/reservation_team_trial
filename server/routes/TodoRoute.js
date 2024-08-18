import express from 'express';
import { store, testRoute } from '../controller/TodoController.js';
import { validationMiddleware } from '../middleware/validationMiddleware.js';
import { TodoSchema } from '../schema/TodoSchema.js';

const router = express.Router();

router.get('/test', testRoute);
router.post('/store', validationMiddleware(TodoSchema), store);

export default router;
