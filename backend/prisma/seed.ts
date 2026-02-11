import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create admin user
    const adminPassword = await bcrypt.hash('Admin123!', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@beautyclinic.com' },
        update: {},
        create: {
            email: 'admin@beautyclinic.com',
            password: adminPassword,
            firstName: 'Admin',
            lastName: 'User',
            phone: '1234567890',
            role: 'ADMIN',
        },
    });
    console.log('✅ Created admin user:', admin.email);

    // Create customer user
    const customerPassword = await bcrypt.hash('Customer123!', 10);
    const customer = await prisma.user.upsert({
        where: { email: 'customer@example.com' },
        update: {},
        create: {
            email: 'customer@example.com',
            password: customerPassword,
            firstName: 'Jane',
            lastName: 'Doe',
            phone: '0987654321',
            role: 'CUSTOMER',
        },
    });
    console.log('✅ Created customer user:', customer.email);

    // Create sample products
    const products = [
        {
            name: 'Vitamin C Serum',
            description: 'Brightening serum with 20% Vitamin C for radiant, youthful skin. Reduces dark spots and improves skin texture.',
            price: 45.99,
            category: 'Skincare',
            brand: 'GlowLab',
            stockQuantity: 50,
            images: JSON.stringify(['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500']),
            ingredients: 'Vitamin C, Hyaluronic Acid, Vitamin E, Ferulic Acid',
            skinType: JSON.stringify(['All Skin Types', 'Dry', 'Normal']),
            rating: 4.8,
            reviewCount: 124,
        },
        {
            name: 'Hyaluronic Acid Moisturizer',
            description: 'Ultra-hydrating moisturizer that locks in moisture for 24 hours. Perfect for dry and dehydrated skin.',
            price: 32.50,
            category: 'Skincare',
            brand: 'HydraGlow',
            stockQuantity: 75,
            images: JSON.stringify(['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500']),
            ingredients: 'Hyaluronic Acid, Glycerin, Ceramides, Niacinamide',
            skinType: JSON.stringify(['Dry', 'Normal', 'Sensitive']),
            rating: 4.6,
            reviewCount: 89,
        },
        {
            name: 'Retinol Night Cream',
            description: 'Anti-aging night cream with retinol to reduce fine lines and wrinkles. Wake up to smoother, younger-looking skin.',
            price: 58.00,
            category: 'Skincare',
            brand: 'YouthRevive',
            stockQuantity: 30,
            images: JSON.stringify(['https://images.unsplash.com/photo-1571875257727-256c39da42af?w=500']),
            ingredients: 'Retinol, Peptides, Vitamin E, Shea Butter',
            skinType: JSON.stringify(['Normal', 'Dry', 'Mature']),
            rating: 4.9,
            reviewCount: 156,
        },
        {
            name: 'Gentle Cleansing Foam',
            description: 'pH-balanced cleansing foam that removes impurities without stripping natural oils. Suitable for sensitive skin.',
            price: 24.99,
            category: 'Skincare',
            brand: 'PureClean',
            stockQuantity: 100,
            images: JSON.stringify(['https://images.unsplash.com/photo-1556228852-80a3c7e8d1f8?w=500']),
            ingredients: 'Glycerin, Chamomile Extract, Aloe Vera, Green Tea',
            skinType: JSON.stringify(['All Skin Types', 'Sensitive', 'Oily']),
            rating: 4.5,
            reviewCount: 67,
        },
        {
            name: 'Niacinamide Serum',
            description: '10% Niacinamide serum to minimize pores, control oil, and even skin tone. Ideal for oily and combination skin.',
            price: 28.75,
            category: 'Skincare',
            brand: 'ClearSkin',
            stockQuantity: 60,
            images: JSON.stringify(['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500']),
            ingredients: 'Niacinamide, Zinc, Hyaluronic Acid, Tamarind Extract',
            skinType: JSON.stringify(['Oily', 'Combination', 'Acne-Prone']),
            rating: 4.7,
            reviewCount: 98,
        },
        {
            name: 'Sunscreen SPF 50+',
            description: 'Broad-spectrum sunscreen with SPF 50+ protection. Lightweight, non-greasy formula suitable for daily use.',
            price: 35.00,
            category: 'Skincare',
            brand: 'SunShield',
            stockQuantity: 80,
            images: JSON.stringify(['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500']),
            ingredients: 'Zinc Oxide, Titanium Dioxide, Vitamin E, Green Tea Extract',
            skinType: JSON.stringify(['All Skin Types']),
            rating: 4.8,
            reviewCount: 142,
        },
        {
            name: 'Lip Plumping Gloss',
            description: 'High-shine lip gloss with plumping effect. Infused with peptides and hyaluronic acid for fuller-looking lips.',
            price: 22.00,
            category: 'Cosmetics',
            brand: 'LuxeLips',
            stockQuantity: 45,
            images: JSON.stringify(['https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500']),
            ingredients: 'Hyaluronic Acid, Peptides, Vitamin E, Natural Oils',
            skinType: JSON.stringify(['All Skin Types']),
            rating: 4.4,
            reviewCount: 73,
        },
        {
            name: 'Facial Massage Roller',
            description: 'Rose quartz facial roller for lymphatic drainage and improved circulation. Reduces puffiness and promotes relaxation.',
            price: 39.99,
            category: 'Beauty Devices',
            brand: 'BeautyTools',
            stockQuantity: 25,
            images: JSON.stringify(['https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500']),
            ingredients: 'Rose Quartz Stone, Stainless Steel',
            skinType: JSON.stringify(['All Skin Types']),
            rating: 4.6,
            reviewCount: 54,
        },
    ];

    // Delete existing products and create new ones
    await prisma.product.deleteMany({});
    await prisma.product.createMany({
        data: products,
    });
    console.log(`✅ Created ${products.length} products`);

    console.log('🎉 Seeding completed!');
    console.log('\n📝 Test Credentials:');
    console.log('Admin: admin@beautyclinic.com / Admin123!');
    console.log('Customer: customer@example.com / Customer123!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
