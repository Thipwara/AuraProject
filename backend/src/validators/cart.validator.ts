import { z } from 'zod';

export const addToCartSchema = z.object({
    body: z.object({
        productId: z.string().uuid('Invalid product ID'),
        quantity: z.number().int().positive('Quantity must be positive'),
    }),
});

export const updateCartItemSchema = z.object({
    params: z.object({
        itemId: z.string().uuid('Invalid item ID'),
    }),
    body: z.object({
        quantity: z.number().int().positive('Quantity must be positive'),
    }),
});

export const removeCartItemSchema = z.object({
    params: z.object({
        itemId: z.string().uuid('Invalid item ID'),
    }),
});
