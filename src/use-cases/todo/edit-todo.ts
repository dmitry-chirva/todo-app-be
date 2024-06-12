import Todo from "../../entities/todo";
import {TodoRepository, todoRepository} from "../../modules/todo/todo.repository";

class EditTodo {
    constructor(private todoRepository: TodoRepository) {}

    async execute(id: number, title: string, userId: number): Promise<Todo> {
        const existingTodo = await this.todoRepository.findById(id);

        if (!existingTodo) {
            throw new Error(`Todo with id ${id} not found`);
        }

        if (existingTodo.userId !== userId) {
            throw new Error(`Forbidden`);
        }

        return this.todoRepository.editTitle(id, title);
    }
}

export default new EditTodo(todoRepository);
