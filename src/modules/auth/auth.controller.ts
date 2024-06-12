import { NextFunction, Request, Response } from "express";

import signIn from '../../use-cases/auth/signin';
import signUp from '../../use-cases/auth/signup';
import refresh from '../../use-cases/auth/refresh';
import logout from '../../use-cases/auth/logout';

class AuthController {
    async handleSignUp(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await signUp.execute({ email, password });
            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    }

    async handleSignIn(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const token = await signIn.execute({ email, password });
            res.json({ token });
        } catch (e) {
            next(e);
        }
    }

    async handleRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) return res.sendStatus(401);

            const tokens = await refresh.execute(refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true, secure: true });
            res.json({ accessToken: tokens.accessToken });
        } catch (error) {
            next(error);
        }
    }

    async handleLogout(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.cookies.refreshToken;
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (refreshToken) {
                await logout.execute(refreshToken);
                res.clearCookie('refreshToken');
            }

            if (token) {
                await logout.execute(token);
            }

            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

const authController = new AuthController();

export {
    authController,
    AuthController
};
