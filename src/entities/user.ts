class User {
    constructor(
        public id: number | null,
        public email: string,
        public hash?: string,
    ) {}
}

export default User;
