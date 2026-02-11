# 🚀 Quick Start Guide

## Prerequisites
- Node.js v18+ and npm v9+

## Setup Steps

### 1. Fix npm Cache (If Needed)
```bash
sudo chown -R $(whoami) ~/.npm
```
Enter your password when prompted.

### 2. Install & Run Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Backend runs on **http://localhost:5000**

### 3. Install & Run Frontend (New Terminal)
```bash
cd frontend
npm install
npm start
```

Frontend runs on **http://localhost:3000**

## Test Credentials

**Admin**: admin@beautyclinic.com / Admin123!  
**Customer**: customer@example.com / Customer123!

## API Endpoints

- **Auth**: `/api/v1/auth/*`
- **Products**: `/api/v1/products`
- **Cart**: `/api/v1/cart`

## What's Complete

✅ **Backend** - Full API with auth, products, cart  
✅ **Frontend Core** - Redux, routing, services, design system  
🚧 **Frontend UI** - Placeholder pages (needs implementation)

## Next Steps

Build UI components for:
1. Login/Register pages
2. Product listing with search/filters
3. Product detail page
4. Shopping cart page

See [walkthrough.md](file:///Users/thipwara/.gemini/antigravity/brain/67cadfb2-efe1-4298-8c89-d3b271c4e927/walkthrough.md) for full documentation.
