import { z } from 'zod';

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Product name is required'),
        description: z.string().min(1, 'Description is required'),
        price: z.number().positive('Price must be positive'),
        category: z.string().min(1, 'Category is required'),
        brand: z.string().min(1, 'Brand is required'),
        stockQuantity: z.number().int().min(0, 'Stock quantity must be non-negative'),
        images: z.array(z.string().url()).min(1, 'At least one image is required'),
        ingredients: z.string().optional(),
        skinType: z.array(z.string()).optional(),
    }),
});

export const updateProductSchema = z.object({
    body: z.object({
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        price: z.number().positive().optional(),
        category: z.string().min(1).optional(),
        brand: z.string().min(1).optional(),
        stockQuantity: z.number().int().min(0).optional(),
        images: z.array(z.string().url()).optional(),
        ingredients: z.string().optional(),
        skinType: z.array(z.string()).optional(),
    }),
});

export const getProductsSchema = z.object({
    query: z.object({
        search: z.string().optional(),
        category: z.string().optional(),
        brand: z.string().optional(),
        minPrice: z.string().transform(Number).pipe(z.number().positive()).optional(),
        maxPrice: z.string().transform(Number).pipe(z.number().positive()).optional(),
        skinType: z.string().optional(),
        sortBy: z.enum(['price', 'rating', 'createdAt']).optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        page: z.string().transform(Number).pipe(z.number().int().positive()).optional(),
        limit: z.string().transform(Number).pipe(z.number().int().positive().max(100)).optional(),
    }),
});

export const productIdSchema = z.object({
    params: z.object({
        id: z.string().uuid('Invalid product ID'),
    }),
});
