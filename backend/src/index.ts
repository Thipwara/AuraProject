import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env';
import { errorHandler } from './middleware/error.middleware';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';

const app: Application = express();

// Security middleware
app.use(helmet());
app.use(cors({
    origin: config.cors.origin,
    credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});

// API routes
const apiPrefix = `/api/${config.apiVersion}`;

app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/products`, productRoutes);
app.use(`${apiPrefix}/cart`, cartRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found',
    });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = config.port;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📝 Environment: ${config.env}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}${apiPrefix}`);
    console.log(`💚 Health check: http://localhost:${PORT}/health`);
});

export default app;
