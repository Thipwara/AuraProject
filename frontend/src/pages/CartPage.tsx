import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchCart, updateCartItemQuantity, removeFromCart } from '../store/slices/cartSlice';

const CartPage = () => {
    const dispatch = useAppDispatch();
    const { cart, loading, error } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleQuantityChange = async (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        await dispatch(updateCartItemQuantity({ itemId, quantity: newQuantity }));
    };

    const handleRemoveItem = async (itemId: string) => {
        await dispatch(removeFromCart(itemId));
    };

    if (loading && !cart) {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading cart...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {error}</div>;
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <h1 className="text-gradient">Your Cart is Empty</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Looks like you haven't added any products yet.
                </p>
                <a href="/products" style={{
                    padding: '0.75rem 1.5rem',
                    background: 'var(--color-primary-600)',
                    color: 'white',
                    borderRadius: 'var(--border-radius-md)',
                    fontWeight: '600',
                    textDecoration: 'none'
                }}>
                    Start Shopping
                </a>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Shopping Cart
            </h1>

            <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--border-radius-lg)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
                {cart.items.map((item) => (
                    <div key={item.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '1rem',
                        borderBottom: '1px solid var(--border-color)',
                        gap: '1.5rem'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: '#e0e7ff',
                            borderRadius: 'var(--border-radius-sm)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.5rem'
                        }}>
                            🧴
                        </div>

                        <div style={{ flex: 1 }}>
                            <h3 style={{ margin: '0 0 0.5rem 0' }}>{item.product.name}</h3>
                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                ${item.product.price.toFixed(2)}
                            </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                style={{
                                    padding: '0.25rem 0.5rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '4px',
                                    background: 'var(--bg-primary)',
                                    cursor: 'pointer'
                                }}
                            >
                                -
                            </button>
                            <span style={{ width: '30px', textAlign: 'center' }}>{item.quantity}</span>
                            <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                style={{
                                    padding: '0.25rem 0.5rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '4px',
                                    background: 'var(--bg-primary)',
                                    cursor: 'pointer'
                                }}
                            >
                                +
                            </button>
                        </div>

                        <div style={{ width: '100px', textAlign: 'right', fontWeight: '600' }}>
                            ${item.subtotal.toFixed(2)}
                        </div>

                        <button
                            onClick={() => handleRemoveItem(item.id)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#ef4444',
                                cursor: 'pointer',
                                fontSize: '1.25rem',
                                marginLeft: '1rem'
                            }}
                            aria-label="Remove item"
                        >
                            ×
                        </button>
                    </div>
                ))}

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ fontSize: '1.25rem' }}>
                        Total: <span style={{ fontWeight: '700', color: 'var(--color-primary-600)' }}>${cart.total.toFixed(2)}</span>
                    </div>
                    <button style={{
                        padding: '1rem 2rem',
                        background: 'var(--color-primary-600)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--border-radius-md)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}>
                        Checkout (Demo)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
