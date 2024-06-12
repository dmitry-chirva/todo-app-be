import Todo from "../../entities/todo";
import {TodoRepository, todoRepository} from "../../modules/todo/todo.repository";

class ToggleTodo {
    constructor(private todoRepository: TodoRepository) {}

    async execute(id: number, userId: number): Promise<Todo> {
        const existingTodo = await this.todoRepository.findById(id);

        if (!existingTodo) {
            throw new Error(`Todo with id ${id} not found`);
        }

        if (existingTodo.userId !== userId) {
            throw new Error('Forbidden');
        }

        return this.todoRepository.toggleTodo(id, !existingTodo.completed);
    }
}

export default new ToggleTodo(todoRepository);
