import api from '../utils/api';
import { Cart } from '../types';

export const cartService = {
    async getCart(): Promise<Cart> {
        const response = await api.get('/cart');
        return response.data.data.cart;
    },

    async addItem(productId: string, quantity: number): Promise<Cart> {
        const response = await api.post('/cart/items', { productId, quantity });
        return response.data.data.cart;
    },

    async updateItemQuantity(itemId: string, quantity: number): Promise<Cart> {
        const response = await api.put(`/cart/items/${itemId}`, { quantity });
        return response.data.data.cart;
    },

    async removeItem(itemId: string): Promise<Cart> {
        const response = await api.delete(`/cart/items/${itemId}`);
        return response.data.data.cart;
    },

    async clearCart(): Promise<Cart> {
        const response = await api.delete('/cart');
        return response.data.data.cart;
    },
};
