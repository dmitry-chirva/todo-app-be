import { Request, Response, NextFunction } from 'express';

import { ForbiddenError, ServerError, UnauthorizedError, ValidationError } from '../shared/errors';
import logger from '../drivers/logger/logger';

interface ErrorMap {
    [key: string]: { status: number; error: Error };
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.get().error(err.stack);

    const errorMap: ErrorMap = {
        'UnauthorizedError': {
            status: 401,
            error: new UnauthorizedError('Invalid token')
        },
        'ForbiddenError': {
            status: 403,
            error: new ForbiddenError('Forbidden')
        },
        'ValidationError': {
            status: 400,
            error: new ValidationError(err.message)
        },
        default: {
            status: 500,
            error: new ServerError('Internal Server Error')
        }
    }

    const errorData = errorMap[err.name] || errorMap.default;
    res.status(errorData.status).send({ message: errorData.error.message });
};
