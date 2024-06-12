import Todo from "../../entities/todo";
import {TodoRepository, todoRepository} from "../../modules/todo/todo.repository";

class GetAllTodos {
    constructor(private todoRepository: TodoRepository) {}

    async execute(userId: number): Promise<Todo[]> {
        return this.todoRepository.getAll(userId);
    }
}

export default new GetAllTodos(todoRepository);
