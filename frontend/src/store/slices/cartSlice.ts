import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartService } from '../../services/cartService';
import { Cart } from '../../types';

interface CartState {
    cart: Cart | null;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    cart: null,
    loading: false,
    error: null,
};

// Async thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
    const cart = await cartService.getCart();
    return cart;
});

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, quantity }: { productId: string; quantity: number }) => {
        const cart = await cartService.addItem(productId, quantity);
        return cart;
    }
);

export const updateCartItemQuantity = createAsyncThunk(
    'cart/updateCartItemQuantity',
    async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
        const cart = await cartService.updateItemQuantity(itemId, quantity);
        return cart;
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async (itemId: string) => {
        const cart = await cartService.removeItem(itemId);
        return cart;
    }
);

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
    const cart = await cartService.clearCart();
    return cart;
});

// Slice
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch cart
        builder
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch cart';
            });

        // Add to cart
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add item to cart';
            });

        // Update cart item quantity
        builder
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update cart item';
            });

        // Remove from cart
        builder
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to remove item from cart';
            });

        // Clear cart
        builder
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to clear cart';
            });
    },
});

export const { clearError } = cartSlice.actions;
export default cartSlice.reducer;
