import jwt from 'jsonwebtoken';

import {UserRepository, userRepository} from '../../modules/user/user.repository';
import { JWT_SECRET, JWT_REFRESH_SECRET } from '../../config';

class RefreshToken {
    constructor(private userRepository: UserRepository) {}

    async execute(refreshToken: string) {
        const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;
        const user = await this.userRepository.findById(payload.userId);
        if (!user) throw new Error('Invalid refresh token');

        const newAccessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '15m' });
        const newRefreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, { expiresIn: '1d' });

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}

export default new RefreshToken(userRepository);
