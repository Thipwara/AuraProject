import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import { User, AuthResponse } from '../../types';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    isAuthenticated: !!localStorage.getItem('accessToken'),
    loading: false,
    error: null,
};

// Async thunks
export const register = createAsyncThunk(
    'auth/register',
    async (data: {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phone?: string;
    }) => {
        const response = await authService.register(data);
        return response;
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string; password: string }) => {
        const response = await authService.login(email, password);
        return response;
    }
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
});

export const getProfile = createAsyncThunk('auth/getProfile', async () => {
    const user = await authService.getProfile();
    return user;
});

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setCredentials: (state, action: PayloadAction<AuthResponse>) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;

            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        },
    },
    extraReducers: (builder) => {
        // Register
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isAuthenticated = true;

                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Registration failed';
            });

        // Login
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isAuthenticated = true;

                localStorage.setItem('user', JSON.stringify(action.payload.user));
                localStorage.setItem('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Login failed';
            });

        // Logout
        builder
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;

                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            })
            .addCase(logout.rejected, (state) => {
                state.loading = false;
                // Clear local state even if API call fails
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;

                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            });

        // Get Profile
        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch profile';
            });
    },
});

export const { clearError, setCredentials } = authSlice.actions;
export default authSlice.reducer;
