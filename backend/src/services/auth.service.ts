import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

const SALT_ROUNDS = 10;

export class AuthService {
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    generateAccessToken(userId: string, email: string, role: string): string {
        return jwt.sign(
            { id: userId, email, role },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn } as jwt.SignOptions
        );
    }

    generateRefreshToken(userId: string): string {
        return jwt.sign(
            { id: userId },
            config.jwt.refreshSecret,
            { expiresIn: config.jwt.refreshExpiresIn } as jwt.SignOptions
        );
    }

    async register(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string;
    }) {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new AppError(400, 'User with this email already exists');
        }

        // Hash password
        const hashedPassword = await this.hashPassword(data.password);

        // Create user
        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phone,
                role: 'CUSTOMER',
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                role: true,
                createdAt: true,
            },
        });

        // Generate tokens
        const accessToken = this.generateAccessToken(user.id, user.email, user.role);
        const refreshToken = this.generateRefreshToken(user.id);

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    async login(email: string, password: string) {
        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new AppError(401, 'Invalid email or password');
        }

        // Verify password
        const isPasswordValid = await this.comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new AppError(401, 'Invalid email or password');
        }

        // Generate tokens
        const accessToken = this.generateAccessToken(user.id, user.email, user.role);
        const refreshToken = this.generateRefreshToken(user.id);

        return {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                role: user.role,
                createdAt: user.createdAt,
            },
            accessToken,
            refreshToken,
        };
    }

    async refreshAccessToken(refreshToken: string) {
        try {
            const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret) as {
                id: string;
            };

            const user = await prisma.user.findUnique({
                where: { id: decoded.id },
                select: { id: true, email: true, role: true },
            });

            if (!user) {
                throw new AppError(401, 'User not found');
            }

            const accessToken = this.generateAccessToken(user.id, user.email, user.role);

            return { accessToken };
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new AppError(401, 'Invalid refresh token');
            }
            if (error instanceof jwt.TokenExpiredError) {
                throw new AppError(401, 'Refresh token expired');
            }
            throw error;
        }
    }

    async getUserById(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            throw new AppError(404, 'User not found');
        }

        return user;
    }

    async updateProfile(
        userId: string,
        data: {
            firstName?: string;
            lastName?: string;
            phone?: string;
        }
    ) {
        const user = await prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                phone: true,
                role: true,
                updatedAt: true,
            },
        });

        return user;
    }

    async changePassword(userId: string, oldPassword: string, newPassword: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new AppError(404, 'User not found');
        }

        const isPasswordValid = await this.comparePassword(oldPassword, user.password);

        if (!isPasswordValid) {
            throw new AppError(401, 'Current password is incorrect');
        }

        const hashedPassword = await this.hashPassword(newPassword);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });

        return { message: 'Password changed successfully' };
    }
}

export const authService = new AuthService();
