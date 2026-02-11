import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { login, clearError } from '../store/slices/authSlice';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
        return () => {
            dispatch(clearError());
        };
    }, [isAuthenticated, navigate, dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '4rem auto',
            padding: '2rem',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--border-radius-lg)',
            boxShadow: 'var(--shadow-md)'
        }}>
            <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Welcome Back
            </h1>

            {error && (
                <div style={{
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    background: '#fef2f2',
                    color: '#ef4444',
                    borderRadius: 'var(--border-radius-sm)',
                    fontSize: '0.875rem'
                }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--border-radius-sm)',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 'var(--border-radius-sm)',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)'
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '0.875rem',
                        background: 'var(--color-primary-600)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--border-radius-sm)',
                        fontWeight: '600',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? 'Logging in...' : 'Sign In'}
                </button>
            </form>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                    Admin: admin@beautyclinic.com / Admin123!
                </p>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                    Customer: customer@example.com / Customer123!
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
