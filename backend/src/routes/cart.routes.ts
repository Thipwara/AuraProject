import { Router } from 'express';
import { cartController } from '../controllers/cart.controller';
import { validate } from '../middleware/validate.middleware';
import { authenticate } from '../middleware/auth.middleware';
import {
    addToCartSchema,
    updateCartItemSchema,
    removeCartItemSchema,
} from '../validators/cart.validator';

const router = Router();

// All cart routes require authentication
router.use(authenticate);

router.get('/', cartController.getCart);
router.post('/items', validate(addToCartSchema), cartController.addItem);
router.put('/items/:itemId', validate(updateCartItemSchema), cartController.updateItemQuantity);
router.delete('/items/:itemId', validate(removeCartItemSchema), cartController.removeItem);
router.delete('/', cartController.clearCart);

export default router;
