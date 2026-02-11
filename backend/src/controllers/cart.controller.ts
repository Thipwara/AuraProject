import { Response } from 'express';
import { cartService } from '../services/cart.service';
import { asyncHandler } from '../middleware/error.middleware';
import { AuthRequest } from '../middleware/auth.middleware';

export class CartController {
    getCart = asyncHandler(async (req: AuthRequest, res: Response) => {
        const cart = await cartService.getOrCreateCart(req.user!.id);

        res.status(200).json({
            status: 'success',
            data: { cart },
        });
    });

    addItem = asyncHandler(async (req: AuthRequest, res: Response) => {
        const { productId, quantity } = req.body;
        const cart = await cartService.addItem(req.user!.id, productId, quantity);

        res.status(200).json({
            status: 'success',
            message: 'Item added to cart',
            data: { cart },
        });
    });

    updateItemQuantity = asyncHandler(async (req: AuthRequest, res: Response) => {
        const { itemId } = req.params;
        const { quantity } = req.body;
        const cart = await cartService.updateItemQuantity(req.user!.id, itemId, quantity);

        res.status(200).json({
            status: 'success',
            message: 'Cart item updated',
            data: { cart },
        });
    });

    removeItem = asyncHandler(async (req: AuthRequest, res: Response) => {
        const { itemId } = req.params;
        const cart = await cartService.removeItem(req.user!.id, itemId);

        res.status(200).json({
            status: 'success',
            message: 'Item removed from cart',
            data: { cart },
        });
    });

    clearCart = asyncHandler(async (req: AuthRequest, res: Response) => {
        const cart = await cartService.clearCart(req.user!.id);

        res.status(200).json({
            status: 'success',
            message: 'Cart cleared',
            data: { cart },
        });
    });
}

export const cartController = new CartController();
