import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { productService } from '../../services/productService';
import { Product, ProductFilters, PaginationInfo } from '../../types';

interface ProductsState {
    products: Product[];
    selectedProduct: Product | null;
    categories: string[];
    brands: string[];
    filters: ProductFilters;
    pagination: PaginationInfo | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    selectedProduct: null,
    categories: [],
    brands: [],
    filters: {
        page: 1,
        limit: 20,
        sortBy: 'createdAt',
        sortOrder: 'desc',
    },
    pagination: null,
    loading: false,
    error: null,
};

// Async thunks
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (filters: ProductFilters) => {
        const response = await productService.getProducts(filters);
        return response;
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (id: string) => {
        const product = await productService.getProductById(id);
        return product;
    }
);

export const fetchCategories = createAsyncThunk(
    'products/fetchCategories',
    async () => {
        const categories = await productService.getCategories();
        return categories;
    }
);

export const fetchBrands = createAsyncThunk(
    'products/fetchBrands',
    async () => {
        const brands = await productService.getBrands();
        return brands;
    }
);

// Slice
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                page: 1,
                limit: 20,
                sortBy: 'createdAt',
                sortOrder: 'desc',
            };
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch products
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });

        // Fetch product by ID
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch product';
            });

        // Fetch categories
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch categories';
            });

        // Fetch brands
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch brands';
            });
    },
});

export const { setFilters, clearFilters, clearError } = productsSlice.actions;
export default productsSlice.reducer;
