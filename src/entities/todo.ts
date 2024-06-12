class Todo {
    constructor(
        public id: number | null,
        public title: string,
        public completed: boolean = false,
        public createdAt: Date = new Date(),
        public userId: number
    ) {}
}

export default Todo;
