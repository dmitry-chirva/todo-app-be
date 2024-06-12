import Todo from "../../entities/todo";
import {TodoRepository, todoRepository} from "../../modules/todo/todo.repository";

class GetCompletedTodos {
    constructor(private todoRepository: TodoRepository) {}

    async execute(userId: number): Promise<Todo[]> {
        return this.todoRepository.getAll(userId, true);
    }
}

export default new GetCompletedTodos(todoRepository);
