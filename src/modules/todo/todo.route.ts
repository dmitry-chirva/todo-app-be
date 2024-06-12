import { Router } from 'express';
import {todoController} from './todo.controller';
import { authenticateToken } from '../../middlewares/auth-token';

const router = Router();

router.get('/todos', authenticateToken, (req, res, next) => todoController.handleGetTodos(req, res, next));
router.get('/todos/completed', authenticateToken, (req, res, next) => todoController.handleGetCompletedTodos(req, res, next));
router.get('/todos/uncompleted', authenticateToken, (req, res, next) => todoController.handleGetUnCompletedTodos(req, res, next));
router.post('/todos', authenticateToken, (req, res, next) => todoController.handleCreateTodo(req, res, next));
router.put('/todos/:id/edit', authenticateToken, (req, res, next) => todoController.handleEditTodo(req, res, next));
router.put('/todos/:id/toggle', authenticateToken, (req, res, next) => todoController.handleToggleTodo(req, res, next));
router.delete('/todos/:id', authenticateToken, (req, res, next) => todoController.handleDeleteTodo(req, res, next));
router.delete('/todos', authenticateToken, (req, res, next) => todoController.handleClearTodos(req, res, next));

export default router;
