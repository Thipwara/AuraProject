import api from '../utils/api';
import { AuthResponse, User } from '../types';

export const authService = {
    async register(data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string;
    }): Promise<AuthResponse> {
        const response = await api.post('/auth/register', data);
        return response.data.data;
    },

    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await api.post('/auth/login', { email, password });
        return response.data.data;
    },

    async logout(): Promise<void> {
        await api.post('/auth/logout');
    },

    async getProfile(): Promise<User> {
        const response = await api.get('/auth/profile');
        return response.data.data.user;
    },

    async updateProfile(data: {
        firstName?: string;
        lastName?: string;
        phone?: string;
    }): Promise<User> {
        const response = await api.put('/auth/profile', data);
        return response.data.data.user;
    },

    async changePassword(oldPassword: string, newPassword: string): Promise<void> {
        await api.put('/auth/password', { oldPassword, newPassword });
    },
};
