import { addToBlacklist } from '../../middlewares/blacklist';

class LogoutUser {
    async execute(refreshToken: string) {
        await addToBlacklist(refreshToken);
    }
}

export default new LogoutUser();
