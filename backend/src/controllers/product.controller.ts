import { Response } from 'express';
import { productService } from '../services/product.service';
import { asyncHandler } from '../middleware/error.middleware';
import { AuthRequest } from '../middleware/auth.middleware';

export class ProductController {
    getAllProducts = asyncHandler(async (req: AuthRequest, res: Response) => {
        const filters = {
            search: req.query.search as string,
            category: req.query.category as string,
            brand: req.query.brand as string,
            minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
            maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
            skinType: req.query.skinType as string,
            sortBy: req.query.sortBy as 'price' | 'rating' | 'createdAt',
            sortOrder: req.query.sortOrder as 'asc' | 'desc',
            page: req.query.page ? Number(req.query.page) : undefined,
            limit: req.query.limit ? Number(req.query.limit) : undefined,
        };

        const result = await productService.getAllProducts(filters);

        res.status(200).json({
            status: 'success',
            data: result,
        });
    });

    getProductById = asyncHandler(async (req: AuthRequest, res: Response) => {
        const product = await productService.getProductById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: { product },
        });
    });

    createProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
        const product = await productService.createProduct(req.body);

        res.status(201).json({
            status: 'success',
            message: 'Product created successfully',
            data: { product },
        });
    });

    updateProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
        const product = await productService.updateProduct(req.params.id, req.body);

        res.status(200).json({
            status: 'success',
            message: 'Product updated successfully',
            data: { product },
        });
    });

    deleteProduct = asyncHandler(async (req: AuthRequest, res: Response) => {
        const result = await productService.deleteProduct(req.params.id);

        res.status(200).json({
            status: 'success',
            message: result.message,
        });
    });

    getCategories = asyncHandler(async (_req: AuthRequest, res: Response) => {
        const categories = await productService.getCategories();

        res.status(200).json({
            status: 'success',
            data: { categories },
        });
    });

    getBrands = asyncHandler(async (_req: AuthRequest, res: Response) => {
        const brands = await productService.getBrands();

        res.status(200).json({
            status: 'success',
            data: { brands },
        });
    });
}

export const productController = new ProductController();
