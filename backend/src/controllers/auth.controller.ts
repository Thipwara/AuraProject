import { Response } from 'express';
import { authService } from '../services/auth.service';
import { asyncHandler } from '../middleware/error.middleware';
import { AuthRequest } from '../middleware/auth.middleware';

export class AuthController {
    register = asyncHandler(async (req: AuthRequest, res: Response) => {
        const result = await authService.register(req.body);

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            data: result,
        });
    });

    login = asyncHandler(async (req: AuthRequest, res: Response) => {
        const { email, password } = req.body;
        const result = await authService.login(email, password);

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: result,
        });
    });

    refreshToken = asyncHandler(async (req: AuthRequest, res: Response) => {
        const { refreshToken } = req.body;
        const result = await authService.refreshAccessToken(refreshToken);

        res.status(200).json({
            status: 'success',
            data: result,
        });
    });

    getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
        const user = await authService.getUserById(req.user!.id);

        res.status(200).json({
            status: 'success',
            data: { user },
        });
    });

    updateProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
        const user = await authService.updateProfile(req.user!.id, req.body);

        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            data: { user },
        });
    });

    changePassword = asyncHandler(async (req: AuthRequest, res: Response) => {
        const { oldPassword, newPassword } = req.body;
        const result = await authService.changePassword(
            req.user!.id,
            oldPassword,
            newPassword
        );

        res.status(200).json({
            status: 'success',
            message: result.message,
        });
    });

    logout = asyncHandler(async (_req: AuthRequest, res: Response) => {
        // In a stateless JWT system, logout is handled client-side
        // If using Redis for token blacklisting, implement it here
        res.status(200).json({
            status: 'success',
            message: 'Logout successful',
        });
    });
}

export const authController = new AuthController();
