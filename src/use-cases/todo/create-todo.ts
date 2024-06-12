import Todo from "../../entities/todo";
import {TodoRepository, todoRepository} from "../../modules/todo/todo.repository";

class CreateTodo {
    constructor(private todoRepository: TodoRepository) {}

    async execute(title: string, userId: number): Promise<Todo> {
        const existingTodo = await this.todoRepository.findByName(title);

        if(existingTodo) {
            throw new Error(`Todo with title ${title} already exist`);
        }

        return this.todoRepository.create(new Todo(null, title, false, new Date(), userId));
    }
}

export default new CreateTodo(todoRepository);
