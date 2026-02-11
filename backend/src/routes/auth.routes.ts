import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
import {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
    updateProfileSchema,
    changePasswordSchema,
} from '../validators/auth.validator';

const router = Router();

// Public routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh-token', validate(refreshTokenSchema), authController.refreshToken);

// Protected routes
router.use(authenticate); // All routes below require authentication

router.get('/profile', authController.getProfile);
router.put('/profile', validate(updateProfileSchema), authController.updateProfile);
router.put('/password', validate(changePasswordSchema), authController.changePassword);
router.post('/logout', authController.logout);

export default router;
