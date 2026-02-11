import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';
import { Prisma } from '@prisma/client';

export interface ProductFilters {
    search?: string;
    category?: string;
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    skinType?: string;
    sortBy?: 'price' | 'rating' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

export class ProductService {
    async getAllProducts(filters: ProductFilters) {
        const {
            search,
            category,
            brand,
            minPrice,
            maxPrice,
            skinType,
            sortBy = 'createdAt',
            sortOrder = 'desc',
            page = 1,
            limit = 20,
        } = filters;

        const where: Prisma.ProductWhereInput = {};

        // Search filter
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { brand: { contains: search, mode: 'insensitive' } },
            ];
        }

        // Category filter
        if (category) {
            where.category = { equals: category, mode: 'insensitive' };
        }

        // Brand filter
        if (brand) {
            where.brand = { equals: brand, mode: 'insensitive' };
        }

        // Price range filter
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined) where.price.gte = minPrice;
            if (maxPrice !== undefined) where.price.lte = maxPrice;
        }

        // Skin type filter
        if (skinType) {
            where.skinType = { contains: skinType };
        }

        // Pagination
        const skip = (page - 1) * limit;

        // Sorting
        const orderBy: Prisma.ProductOrderByWithRelationInput = {
            [sortBy]: sortOrder,
        };

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                orderBy,
                skip,
                take: limit,
            }),
            prisma.product.count({ where }),
        ]);

        return {
            products,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async getProductById(id: string) {
        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            throw new AppError(404, 'Product not found');
        }

        return product;
    }

    async createProduct(data: {
        name: string;
        description: string;
        price: number;
        category: string;
        brand: string;
        stockQuantity: number;
        images: string[];
        ingredients?: string;
        skinType?: string[];
    }) {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.category,
                brand: data.brand,
                stockQuantity: data.stockQuantity,
                images: JSON.stringify(data.images),
                ingredients: data.ingredients,
                skinType: data.skinType ? JSON.stringify(data.skinType) : null,
            },
        });

        return product;
    }

    async updateProduct(
        id: string,
        data: {
            name?: string;
            description?: string;
            price?: number;
            category?: string;
            brand?: string;
            stockQuantity?: number;
            images?: string[];
            ingredients?: string;
            skinType?: string[];
        }
    ) {
        const updateData: any = { ...data };

        if (data.images) {
            updateData.images = JSON.stringify(data.images);
        }

        if (data.skinType) {
            updateData.skinType = JSON.stringify(data.skinType);
        }

        const product = await prisma.product.update({
            where: { id },
            data: updateData,
        });

        return product;
    }

    async deleteProduct(id: string) {
        await prisma.product.delete({
            where: { id },
        });

        return { message: 'Product deleted successfully' };
    }

    async getCategories() {
        const products = await prisma.product.findMany({
            select: { category: true },
            distinct: ['category'],
        });

        return products.map((p) => p.category);
    }

    async getBrands() {
        const products = await prisma.product.findMany({
            select: { brand: true },
            distinct: ['brand'],
        });

        return products.map((p) => p.brand);
    }
}

export const productService = new ProductService();
