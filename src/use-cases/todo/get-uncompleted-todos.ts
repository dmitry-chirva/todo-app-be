import Todo from "../../entities/todo";
import {TodoRepository, todoRepository} from "../../modules/todo/todo.repository";

class GetUnCompletedTodos {
    constructor(private todoRepository: TodoRepository) {}

    async execute(userId: number): Promise<Todo[]> {
        return this.todoRepository.getAll(userId, false);
    }
}

export default new GetUnCompletedTodos(todoRepository);
