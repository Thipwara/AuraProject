import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { validate } from '../middleware/validate.middleware';
import { authenticate, authorize } from '../middleware/auth.middleware';
import {
    createProductSchema,
    updateProductSchema,
    getProductsSchema,
    productIdSchema,
} from '../validators/product.validator';

const router = Router();

// Public routes (no authentication required)
router.get('/', validate(getProductsSchema), productController.getAllProducts);
router.get('/categories', productController.getCategories);
router.get('/brands', productController.getBrands);
router.get('/:id', validate(productIdSchema), productController.getProductById);

// Admin only routes
router.post(
    '/',
    authenticate,
    authorize('ADMIN'),
    validate(createProductSchema),
    productController.createProduct
);

router.put(
    '/:id',
    authenticate,
    authorize('ADMIN'),
    validate(productIdSchema),
    validate(updateProductSchema),
    productController.updateProduct
);

router.delete(
    '/:id',
    authenticate,
    authorize('ADMIN'),
    validate(productIdSchema),
    productController.deleteProduct
);

export default router;
