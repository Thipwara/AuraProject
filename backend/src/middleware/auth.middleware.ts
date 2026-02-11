import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { AppError } from './error.middleware';
import prisma from '../config/database';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
    };
}

export const authenticate = async (
    req: AuthRequest,
    _res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError(401, 'No token provided');
        }

        const token = authHeader.substring(7);

        try {
            const decoded = jwt.verify(token, config.jwt.secret) as {
                id: string;
                email: string;
                role: string;
            };

            // Verify user still exists
            const user = await prisma.user.findUnique({
                where: { id: decoded.id },
                select: { id: true, email: true, role: true },
            });

            if (!user) {
                throw new AppError(401, 'User no longer exists');
            }

            req.user = user;
            next();
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new AppError(401, 'Invalid token');
            }
            if (error instanceof jwt.TokenExpiredError) {
                throw new AppError(401, 'Token expired');
            }
            throw error;
        }
    } catch (error) {
        next(error);
    }
};

export const authorize = (...roles: string[]) => {
    return (req: AuthRequest, _res: Response, next: NextFunction) => {
        if (!req.user) {
            return next(new AppError(401, 'Not authenticated'));
        }

        if (!roles.includes(req.user.role)) {
            return next(new AppError(403, 'Not authorized to access this resource'));
        }

        next();
    };
};
