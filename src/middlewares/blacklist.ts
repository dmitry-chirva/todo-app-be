import { redisClient } from '../drivers/database/redis';
import logger from '../drivers/logger/logger';

redisClient.on('error', (err: Error) => console.log('Redis Client Error', err));

(async () => {
    try {
        await redisClient.connect();
        logger.get().info('Connected to Redis');
    } catch (error) {
        logger.get().error(`Could not connect to Redis: ${error}`);
    }
})();

export const addToBlacklist = async (token: string) => {
    try {
        await redisClient.set(token, 'blacklisted');
    } catch (error) {
        logger.get().error(`Error adding token to blacklist: ${error}`);
    }
};

export const isBlacklisted = async (token: string): Promise<boolean> => {
    try {
        const result = await redisClient.get(token);
        return result === 'blacklisted';
    } catch (error) {
        logger.get().error(`Error checking blacklist status: ${error}`);
        return false;
    }
};
