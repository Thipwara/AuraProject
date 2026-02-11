export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    role: 'CUSTOMER' | 'ADMIN';
    createdAt: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    stockQuantity: number;
    images: string;
    ingredients?: string;
    skinType?: string;
    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CartItem {
    id: string;
    productId: string;
    product: {
        id: string;
        name: string;
        price: number;
        images: string[];
        stockQuantity: number;
    };
    quantity: number;
    subtotal: number;
}

export interface Cart {
    id: string;
    items: CartItem[];
    itemCount: number;
    total: number;
}

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

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface ApiResponse<T> {
    status: 'success' | 'error';
    message?: string;
    data?: T;
    errors?: Array<{ field: string; message: string }>;
}
