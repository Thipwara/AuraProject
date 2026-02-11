import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export class CartService {
    async getOrCreateCart(userId: string) {
        let cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });
        }

        return this.formatCart(cart);
    }

    async addItem(userId: string, productId: string, quantity: number) {
        // Verify product exists and has enough stock
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) {
            throw new AppError(404, 'Product not found');
        }

        if (product.stockQuantity < quantity) {
            throw new AppError(400, `Only ${product.stockQuantity} items available in stock`);
        }

        // Get or create cart
        let cart = await prisma.cart.findUnique({
            where: { userId },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId },
            });
        }

        // Check if item already exists in cart
        const existingItem = await prisma.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });

        if (existingItem) {
            // Update quantity
            const newQuantity = existingItem.quantity + quantity;

            if (product.stockQuantity < newQuantity) {
                throw new AppError(400, `Only ${product.stockQuantity} items available in stock`);
            }

            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: newQuantity },
            });
        } else {
            // Create new cart item
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity,
                },
            });
        }

        return this.getOrCreateCart(userId);
    }

    async updateItemQuantity(userId: string, itemId: string, quantity: number) {
        if (quantity < 1) {
            throw new AppError(400, 'Quantity must be at least 1');
        }

        const cartItem = await prisma.cartItem.findUnique({
            where: { id: itemId },
            include: {
                cart: true,
                product: true,
            },
        });

        if (!cartItem) {
            throw new AppError(404, 'Cart item not found');
        }

        if (cartItem.cart.userId !== userId) {
            throw new AppError(403, 'Not authorized to modify this cart');
        }

        if (cartItem.product.stockQuantity < quantity) {
            throw new AppError(400, `Only ${cartItem.product.stockQuantity} items available in stock`);
        }

        await prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity },
        });

        return this.getOrCreateCart(userId);
    }

    async removeItem(userId: string, itemId: string) {
        const cartItem = await prisma.cartItem.findUnique({
            where: { id: itemId },
            include: { cart: true },
        });

        if (!cartItem) {
            throw new AppError(404, 'Cart item not found');
        }

        if (cartItem.cart.userId !== userId) {
            throw new AppError(403, 'Not authorized to modify this cart');
        }

        await prisma.cartItem.delete({
            where: { id: itemId },
        });

        return this.getOrCreateCart(userId);
    }

    async clearCart(userId: string) {
        const cart = await prisma.cart.findUnique({
            where: { userId },
        });

        if (cart) {
            await prisma.cartItem.deleteMany({
                where: { cartId: cart.id },
            });
        }

        return this.getOrCreateCart(userId);
    }

    private formatCart(cart: any) {
        const items = cart.items.map((item: any) => ({
            id: item.id,
            productId: item.productId,
            product: {
                id: item.product.id,
                name: item.product.name,
                price: item.product.price,
                images: JSON.parse(item.product.images),
                stockQuantity: item.product.stockQuantity,
            },
            quantity: item.quantity,
            subtotal: item.product.price * item.quantity,
        }));

        const total = items.reduce((sum: number, item: any) => sum + item.subtotal, 0);

        return {
            id: cart.id,
            items,
            itemCount: items.length,
            total,
        };
    }
}

export const cartService = new CartService();
