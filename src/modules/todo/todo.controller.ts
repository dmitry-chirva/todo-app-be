import { Request, Response, NextFunction } from "express";
import createTodo from "../../use-cases/todo/create-todo";
import getTodos from "../../use-cases/todo/get-todos";
import editTodo from "../../use-cases/todo/edit-todo";
import deleteTodo from "../../use-cases/todo/delete-todo";
import clearTodos from '../../use-cases/todo/clear-todos';
import toggleTodo from '../../use-cases/todo/toggle-todo';
import getCompletedTodos from '../../use-cases/todo/get-completed-todos';
import getUnCompletedTodos from '../../use-cases/todo/get-uncompleted-todos';

class TodoController {
    async handleGetTodos(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.userId;
            const todos = await getTodos.execute(userId);
            res.json(todos);
        } catch (e) {
            next(e);
        }
    }

    async handleGetCompletedTodos(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.userId;
            const todos = await getCompletedTodos.execute(userId);
            res.json(todos);
        } catch (e) {
            next(e);
        }
    }

    async handleGetUnCompletedTodos(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.userId;
            const todos = await getUnCompletedTodos.execute(userId);
            res.json(todos);
        } catch (e) {
            next(e);
        }

    }

    async handleCreateTodo(req: Request, res: Response, next: NextFunction) {
        const { title } = req.body;
        try {
            const userId = (req as any).user.userId;
            const todo = await createTodo.execute(title, userId);
            res.json(todo);
        } catch (e) {
            next(e);
        }
    }

    async handleEditTodo(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { title } = req.body;
        try {
            const userId = (req as any).user.userId;
            const todo = await editTodo.execute(parseInt(id), title, userId);
            res.json(todo);
        } catch (e) {
            next(e);
        }
    }

    async handleToggleTodo(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const userId = (req as any).user.userId;
            const todo = await toggleTodo.execute(parseInt(id), userId);
            res.json(todo);
        } catch (e) {
            next(e);
        }
    }

    async handleDeleteTodo(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const userId = (req as any).user.userId;
            await deleteTodo.execute(parseInt(id), userId);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    async handleClearTodos(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = (req as any).user.userId;
            await clearTodos.execute(userId);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}

const todoController = new TodoController();

export {
    todoController,
    TodoController
};
