# Aura Project
<img width="3164" height="1890" alt="image" src="https://github.com/user-attachments/assets/1fd75dea-586e-4f40-91b4-0a6124f21bb7" />
<img width="3164" height="1890" alt="image" src="https://github.com/user-attachments/assets/1c6076d4-bea6-42a8-8a0a-0a06b1ca9496" />



A modern, full-stack e-commerce web application built with Node.js and TypeScript, designed specifically for beauty clinics to showcase and sell their products and services.

## 🌟 Features

### User Authentication
- **User Registration**: Secure account creation with email verification
- **Login/Logout**: JWT-based authentication system
- **Password Recovery**: Email-based password reset functionality
- **User Profile Management**: Update personal information and preferences

### Product Management
- **Product Search**: Advanced search functionality with filters
  - Search by product name, category, or brand
  - Filter by price range, skin type, and product category
  - Sort by price, popularity, or newest arrivals
- **Product Catalog**: Browse all beauty clinic products
  - Skincare products
  - Cosmetics
  - Treatment packages
  - Beauty devices
- **Product Details**: Comprehensive product information
  - High-quality product images
  - Detailed descriptions and ingredients
  - Customer reviews and ratings
  - Usage instructions
  - Stock availability

### Shopping Cart
- **Add to Cart**: Easy product selection with quantity control
- **Cart Management**: 
  - Update product quantities
  - Remove items
  - Save for later
- **Price Calculation**: Real-time total with tax and shipping
- **Persistent Cart**: Cart saved across sessions

### Additional Features
- **Responsive Design**: Mobile-first, works on all devices
- **Admin Dashboard**: Product and order management (admin only)
- **Order History**: Track past purchases
- **Wishlist**: Save favorite products

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: 
  - CSS Modules / Styled Components
  - Material-UI or Tailwind CSS
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js with TypeScript
- **Database**: 
  - PostgreSQL (primary database)
  - Redis (session management & caching)
- **ORM**: Prisma or TypeORM
- **Authentication**: 
  - JWT (JSON Web Tokens)
  - bcrypt for password hashing
- **Validation**: Zod or Joi
- **File Upload**: Multer (for product images)

### DevOps & Tools
- **Package Manager**: npm or yarn
- **Build Tool**: Webpack / Vite
- **Testing**: 
  - Jest (unit tests)
  - Supertest (API tests)
  - React Testing Library
- **Code Quality**: 
  - ESLint
  - Prettier
  - Husky (Git hooks)
- **API Documentation**: Swagger/OpenAPI
- **Environment**: dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or yarn v1.22.0+)
- **PostgreSQL**: v14.0 or higher
- **Redis**: v7.0 or higher (optional, for caching)
- **Git**: Latest version

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Thipwara/AuraProject.git
cd AuraProject
```

### 2. Install Dependencies

#### Backend Setup
```bash
cd backend
npm install
```

#### Frontend Setup
```bash
cd frontend
npm install
```

### 3. Environment Configuration

#### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/beauty_clinic_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=beauty_clinic_db
DB_USER=your_username
DB_PASSWORD=your_password

# Redis Configuration (Optional)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=30d

# Email Configuration (for password reset)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=noreply@beautyclinic.com

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_DIR=./uploads

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Payment Gateway (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

#### Frontend Environment Variables
Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api/v1
REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 4. Database Setup

```bash
cd backend

# Create database
createdb beauty_clinic_db

# Run migrations
npm run migrate

# Seed database with sample data (optional)
npm run seed
```

### 5. Run the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs

#### Production Mode

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd backend
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
AuraProject/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   ├── validators/      # Request validation schemas
│   │   └── index.ts         # Entry point
│   ├── tests/               # Test files
│   ├── uploads/             # Uploaded files
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks
│   │   ├── store/           # Redux store
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   ├── styles/          # Global styles
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `POST /api/v1/auth/refresh-token` - Refresh access token
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password

### Products
- `GET /api/v1/products` - Get all products (with pagination & filters)
- `GET /api/v1/products/:id` - Get product details
- `GET /api/v1/products/search` - Search products
- `POST /api/v1/products` - Create product (admin only)
- `PUT /api/v1/products/:id` - Update product (admin only)
- `DELETE /api/v1/products/:id` - Delete product (admin only)

### Cart
- `GET /api/v1/cart` - Get user's cart
- `POST /api/v1/cart/items` - Add item to cart
- `PUT /api/v1/cart/items/:id` - Update cart item quantity
- `DELETE /api/v1/cart/items/:id` - Remove item from cart
- `DELETE /api/v1/cart` - Clear cart

### Orders
- `GET /api/v1/orders` - Get user's orders
- `GET /api/v1/orders/:id` - Get order details
- `POST /api/v1/orders` - Create new order
- `PUT /api/v1/orders/:id/status` - Update order status (admin only)

### Users
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `PUT /api/v1/users/password` - Change password

## 🗄️ Database Schema

### Users Table
```typescript
{
  id: string (UUID)
  email: string (unique)
  password: string (hashed)
  firstName: string
  lastName: string
  phone: string
  role: enum ('customer', 'admin')
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Products Table
```typescript
{
  id: string (UUID)
  name: string
  description: text
  price: decimal
  category: string
  brand: string
  stockQuantity: integer
  images: string[] (URLs)
  ingredients: text
  skinType: string[]
  rating: decimal
  reviewCount: integer
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Cart Table
```typescript
{
  id: string (UUID)
  userId: string (FK)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### CartItems Table
```typescript
{
  id: string (UUID)
  cartId: string (FK)
  productId: string (FK)
  quantity: integer
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Orders Table
```typescript
{
  id: string (UUID)
  userId: string (FK)
  totalAmount: decimal
  status: enum ('pending', 'processing', 'shipped', 'delivered', 'cancelled')
  shippingAddress: json
  paymentMethod: string
  createdAt: timestamp
  updatedAt: timestamp
}
```

## 🧪 Testing

### Run Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# Run tests with coverage
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test API endpoints
- **E2E Tests**: Test complete user flows

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Prevent SQL injection and XSS
- **CORS Configuration**: Controlled cross-origin requests
- **Rate Limiting**: Prevent brute force attacks
- **Helmet.js**: Security headers
- **HTTPS**: SSL/TLS encryption (production)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: 1920px and above
- **Laptop**: 1024px - 1919px
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🚢 Deployment

### Backend Deployment (Heroku Example)

```bash
# Login to Heroku
heroku login

# Create new app
heroku create beauty-clinic-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:hobby-dev

# Set environment variables
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add comments for complex logic
- Write tests for new features

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error:**
```bash
# Check PostgreSQL is running
pg_isready

# Verify connection string in .env
```

**Port Already in Use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Module Not Found:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Thipwara** - *Initial work* - [Thipwara](https://github.com/Thipwara)

## 🙏 Acknowledgments

- Beauty clinic industry best practices
- Open source community
- Contributors and testers

## 📞 Support

For support, email support@beautyclinic.com or join our Slack channel.

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] User authentication
- [x] Product catalog
- [x] Shopping cart
- [x] Product search

### Phase 2 (Upcoming)
- [ ] Payment integration (Stripe/PayPal)
- [ ] Order tracking
- [ ] Email notifications
- [ ] Product reviews and ratings

### Phase 3 (Future)
- [ ] Mobile app (React Native)
- [ ] AI-powered product recommendations
- [ ] Live chat support
- [ ] Loyalty program
- [ ] Multi-language support

---

**Built with ❤️ for Beauty Clinics**
