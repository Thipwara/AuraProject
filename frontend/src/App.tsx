import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './hooks/useRedux';
import { logout } from './store/slices/authSlice';
import LoginPage from './pages/LoginPage';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPage';

// Placeholder components - to be implemented
const HomePage = () => (
    // ... keep HomePage ...
    <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Welcome to Beauty Clinic
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
            Premium Skincare & Beauty Products
        </p>
        <div style={{ marginTop: '2rem' }}>
            <a href="/products" style={{
                padding: '1rem 2rem',
                background: 'var(--color-primary-600)',
                color: 'white',
                borderRadius: 'var(--border-radius-lg)',
                display: 'inline-block',
                fontWeight: '600'
            }}>
                Shop Now
            </a>
        </div>
    </div>
);

const RegisterPage = () => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Register Page</h1>
        <p>Registration component to be implemented</p>
    </div>
);

const ProductDetailPage = () => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Product Details</h1>
        <p>Product detail component to be implemented</p>
    </div>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    return (
        <Router>
            <div className="App" style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
                {/* Navbar will go here */}
                <nav style={{
                    padding: '1rem 2rem',
                    background: 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <a href="/" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-primary-600)' }}>
                        Beauty Clinic
                    </a>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <a href="/products">Products</a>
                        <a href="/cart">Cart</a>
                        {isAuthenticated ? (
                            <button
                                onClick={() => dispatch(logout())}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--text-primary)',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontFamily: 'inherit'
                                }}
                            >
                                Logout
                            </button>
                        ) : (
                            <a href="/login">Login</a>
                        )}
                    </div>
                </nav>

                {/* Main Content */}
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/products" element={<ProductListPage />} />
                        <Route path="/products/:id" element={<ProductDetailPage />} />
                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <CartPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>

                {/* Footer will go here */}
                <footer style={{
                    padding: '2rem',
                    background: 'var(--bg-secondary)',
                    borderTop: '1px solid var(--border-color)',
                    textAlign: 'center',
                    marginTop: '4rem'
                }}>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        © 2026 Beauty Clinic. All rights reserved.
                    </p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
