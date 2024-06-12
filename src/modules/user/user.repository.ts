import bcrypt from 'bcrypt';
import databaseClient from '../../drivers/database';
import User from '../../entities/user';

class UserRepository {
    async createUser(email: string, password: string): Promise<User> {
        const hash = await bcrypt.hash(password, 10);
        const createdUser = await databaseClient.user.create({
            data: {
                email,
                hash,
            },
        }) as unknown as User;

        return new User(
            createdUser.id,
            createdUser.email
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await databaseClient.user.findUnique({
            where: { email },
        }) as unknown as User;

        return new User(
            user.id,
            user.email,
            user.hash
        );
    }

    async findById(id: number): Promise<User | null> {
        const user = await databaseClient.user.findUnique({
            where: { id },
        }) as unknown as User;

        return new User(
            user.id,
            user.email,
            user.hash
        );
    }
}

const userRepository = new UserRepository();

export {
    userRepository,
    UserRepository
};
