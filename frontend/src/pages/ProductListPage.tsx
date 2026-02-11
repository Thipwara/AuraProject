import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProducts } from '../store/slices/productsSlice';
import { addToCart } from '../store/slices/cartSlice';

const ProductListPage = () => {
    const dispatch = useAppDispatch();
    const { products, loading, error } = useAppSelector((state) => state.products);
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchProducts({}));
    }, [dispatch]);

    const handleAddToCart = async (productId: string) => {
        if (!isAuthenticated) {
            alert('Please login to add items to cart');
            return;
        }
        try {
            await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
            alert('Product added to cart!');
        } catch (err) {
            alert('Failed to add to cart');
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Our Products
            </h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2rem'
            }}>
                {products.map((product) => (
                    <div key={product.id} style={{
                        background: 'var(--bg-secondary)',
                        borderRadius: 'var(--border-radius-lg)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'transform 0.2s ease',
                        border: '1px solid var(--border-color)'
                    }}>
                        <div style={{ height: '200px', background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Placeholder for image if not available */}
                            <span style={{ fontSize: '3rem' }}>🧴</span>
                        </div>

                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{product.name}</h3>
                                <span style={{
                                    background: 'var(--color-primary-100)',
                                    color: 'var(--color-primary-700)',
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '999px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                }}>
                                    {product.category}
                                </span>
                            </div>

                            <p style={{
                                color: 'var(--text-secondary)',
                                fontSize: '0.875rem',
                                marginBottom: '1rem',
                                height: '2.6em',
                                overflow: 'hidden'
                            }}>
                                {product.description}
                            </p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                                <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-primary-600)' }}>
                                    ${product.price.toFixed(2)}
                                </span>
                                <button
                                    onClick={() => handleAddToCart(product.id)}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        background: 'var(--color-primary-600)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 'var(--border-radius-md)',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListPage;
