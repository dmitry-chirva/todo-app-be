import { Router } from 'express';
import {authController} from '../auth/auth.controller';
import { authenticateToken } from '../../middlewares/auth-token';

const router = Router();

router.post('/singup', (req, res, next) => authController.handleSignUp(req, res, next));
router.post('/login', (req, res, next) => authController.handleSignIn(req, res, next));
router.post('/refresh', (req, res, next) => authController.handleRefreshToken(req, res, next));
router.post('/logout', authenticateToken, (req, res, next) => authController.handleLogout(req, res, next));

export default router;
