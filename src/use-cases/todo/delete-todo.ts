import {TodoRepository, todoRepository} from "../../modules/todo/todo.repository";

class DeleteTodos {
    constructor(private todoRepository: TodoRepository) {}

    async execute(id: number, userId: number): Promise<void> {
        const todo = await this.todoRepository.findById(id);
        if (todo?.userId !== userId) {
            throw new Error('Forbidden');
        }

        return this.todoRepository.delete(id);
    }
}

export default new DeleteTodos(todoRepository);
