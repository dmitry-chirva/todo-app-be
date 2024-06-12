import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isBlacklisted } from './blacklist';
import { JWT_SECRET } from '../config';
import logger from '../drivers/logger/logger';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        logger.get().error('401, Token not found');
        return res.sendStatus(401);
    }

    if (await isBlacklisted(token)) {
        logger.get().error('401, Token already exist');
        return res.sendStatus(401)
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {

        if (err) {
            logger.get().error('403, Token invalid');
            return res.sendStatus(403);
        }
        (req as any).user = user;
        next();
    });
};
