import express from 'express';
import { deleteById, findById, store, update } from '../controller/TodoController.js';
import { validateUser } from '../middleware/validationMiddleware.js';

const router = express.Router();

// router.get('/test', testRoute);
router.post('/store', validateUser, store);
router.get('/todos/:id', findById);
router.put('/todos/:id', update);
router.delete('/todos/:id', deleteById);

export default router;
