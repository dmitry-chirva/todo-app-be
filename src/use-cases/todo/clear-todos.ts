import {TodoRepository, todoRepository} from "../../modules/todo/todo.repository";

class ClearTodos {
    constructor(private todoRepository: TodoRepository) {}

    async execute(userId: number): Promise<void> {
        return this.todoRepository.clear(userId);
    }
}

export default new ClearTodos(todoRepository);
