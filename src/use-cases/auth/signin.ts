import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import {UserRepository, userRepository} from '../../modules/user/user.repository';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../../config';

interface LoginInput {
    email: string;
    password: string;
}

class SignIn {
    constructor(private userRepository: UserRepository) {}

    async execute(input: LoginInput): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        const user = await this.userRepository.findByEmail(input.email);

        if (!user || !(await bcrypt.compare(input.password, user?.hash as string))) {
            throw new Error('Invalid email or password');
        }

        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, { expiresIn: '1d' });

        return { accessToken, refreshToken };
    }
}

export default new SignIn(userRepository);
