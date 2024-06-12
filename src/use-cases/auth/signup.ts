import { UserRepository, userRepository } from '../../modules/user/user.repository';
import User from '../../entities/user';

interface SignUpInput {
    email: string;
    password: string;
}

class SignUp {
    constructor(private userRepository: UserRepository) {}

    async execute(input: SignUpInput): Promise<User> {
        return this.userRepository.createUser(input.email, input.password);
    }
}

export default new SignUp(userRepository);
