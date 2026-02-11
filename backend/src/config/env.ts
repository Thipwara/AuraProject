import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().default('5000'),
    API_VERSION: z.string().default('v1'),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.string().default('7d'),
    JWT_REFRESH_SECRET: z.string().min(32),
    JWT_REFRESH_EXPIRES_IN: z.string().default('30d'),
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.string().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    EMAIL_FROM: z.string().optional(),
    MAX_FILE_SIZE: z.string().default('5242880'),
    UPLOAD_DIR: z.string().default('./uploads'),
    FRONTEND_URL: z.string().default('http://localhost:3000'),
    REDIS_HOST: z.string().optional(),
    REDIS_PORT: z.string().optional(),
    REDIS_PASSWORD: z.string().optional(),
});

const parseEnv = () => {
    try {
        return envSchema.parse(process.env);
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ Invalid environment variables:');
            error.errors.forEach((err) => {
                console.error(`  ${err.path.join('.')}: ${err.message}`);
            });
            process.exit(1);
        }
        throw error;
    }
};

export const env = parseEnv();

export const config = {
    env: env.NODE_ENV,
    port: parseInt(env.PORT, 10),
    apiVersion: env.API_VERSION,
    database: {
        url: env.DATABASE_URL,
    },
    jwt: {
        secret: env.JWT_SECRET,
        expiresIn: env.JWT_EXPIRES_IN,
        refreshSecret: env.JWT_REFRESH_SECRET,
        refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
    },
    email: {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT ? parseInt(env.SMTP_PORT, 10) : undefined,
        user: env.SMTP_USER,
        password: env.SMTP_PASSWORD,
        from: env.EMAIL_FROM,
    },
    upload: {
        maxFileSize: parseInt(env.MAX_FILE_SIZE, 10),
        uploadDir: env.UPLOAD_DIR,
    },
    cors: {
        origin: env.FRONTEND_URL,
    },
    redis: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT ? parseInt(env.REDIS_PORT, 10) : undefined,
        password: env.REDIS_PASSWORD,
    },
};
