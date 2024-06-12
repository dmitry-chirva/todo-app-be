import Todo from "../../entities/todo";
import databaseClient from '../../drivers/database';

class TodoRepository {
    async create(todo: Todo): Promise<Todo> {
        const createdTodo = await databaseClient.todo.create({
            data: {
                title: todo.title,
                completed: todo.completed,
                createdAt: todo.createdAt,
                userId: todo.userId
            }
        }) as unknown as Todo

        return new Todo(
            createdTodo.id,
            createdTodo.title,
            createdTodo.completed,
            createdTodo.createdAt,
            createdTodo.userId
        );
    }

    async getAll(userId: number, isCompleted?: boolean): Promise<Todo[]> {
        const filter = isCompleted !== undefined ? {completed: isCompleted} : {};

        const todos = await databaseClient.todo.findMany({
            where: {
                ...filter,
                userId
            }
        });
        return todos.map(
            (todo: Todo) =>
                new Todo(
                    todo.id,
                    todo.title,
                    todo.completed,
                    todo.createdAt,
                    todo.userId
                )
        );
    }

    async editTitle(id: number, title: string): Promise<Todo> {
     const todo = await databaseClient.todo.update({
         where: {
             id
         },
         data: {
             title
         }
     }) as unknown as Todo;

     return new Todo(
         todo.id,
         todo.title,
         todo.completed,
         todo.createdAt,
         todo.userId
     );
    }

    async toggleTodo(id: number, completed: boolean): Promise<Todo> {
        const todo = await databaseClient.todo.update({
            where: {
                id
            },
            data: {
                completed
            }
        }) as unknown as Todo;

        return new Todo(
            todo.id,
            todo.title,
            todo.completed,
            todo.createdAt,
            todo.userId
        );
    }

    async findById(id: number): Promise<Todo | null> {
        const todo = await databaseClient.todo.findUnique({
            where: { id },
        }) as unknown as Todo;

        if (!todo) {
            return null;
        }

        return new Todo(
            todo.id,
            todo.title,
            todo.completed,
            todo.createdAt,
            todo.userId
        );
    }

    async findByName(title: string): Promise<Todo | null> {
        const todo = await databaseClient.todo.findFirst({
            where: {
                title
            },
        }) as unknown as Todo;

        if (!todo) {
            return null;
        }

        return new Todo(
            todo.id,
            todo.title,
            todo.completed,
            todo.createdAt,
            todo.userId
        );
    }

    async delete(id: number): Promise<void> {
        await databaseClient.todo.delete({
            where:{id}
        });
    }

    async clear(userId: number): Promise<void> {
        await databaseClient.todo.deleteMany({
            where: {
                userId
            }
        });
    }
}

const todoRepository = new TodoRepository();

export {
    TodoRepository,
    todoRepository
};
