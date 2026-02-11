import api from '../utils/api';
import { Product, ProductFilters, PaginationInfo } from '../types';

export const productService = {
    async getProducts(filters: ProductFilters): Promise<{
        products: Product[];
        pagination: PaginationInfo;
    }> {
        const params = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, value.toString());
            }
        });

        const response = await api.get(`/products?${params.toString()}`);
        return response.data.data;
    },

    async getProductById(id: string): Promise<Product> {
        const response = await api.get(`/products/${id}`);
        return response.data.data.product;
    },

    async getCategories(): Promise<string[]> {
        const response = await api.get('/products/categories');
        return response.data.data.categories;
    },

    async getBrands(): Promise<string[]> {
        const response = await api.get('/products/brands');
        return response.data.data.brands;
    },

    async createProduct(data: Partial<Product>): Promise<Product> {
        const response = await api.post('/products', data);
        return response.data.data.product;
    },

    async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
        const response = await api.put(`/products/${id}`, data);
        return response.data.data.product;
    },

    async deleteProduct(id: string): Promise<void> {
        await api.delete(`/products/${id}`);
    },
};
