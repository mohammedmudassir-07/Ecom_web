# 🛍️ ShopHub - Modern E-Commerce Platform

A modern, feature-rich e-commerce web application built with Next.js 14, TypeScript, and Tailwind CSS. ShopHub provides a seamless shopping experience with a clean, responsive interface and powerful features for both customers and administrators.

## 🌐 Live Demo

**[View Live Application](https://v0-e-commerce-storefront-five.vercel.app/)**

## ✨ Features

### Customer Features
- 🛒 **Shopping Cart**: Add, remove, and manage items in your cart
- 🔍 **Product Search & Filtering**: Search products by name and filter by category
- 📦 **Product Details**: View detailed product information with ratings and reviews
- 💳 **Checkout Process**: Streamlined checkout with customer information collection
- 📝 **Order Management**: View order history and track orders
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 👤 **User Authentication**: Secure login and registration system

### Admin Features
- 📊 **Admin Dashboard**: Comprehensive overview of store metrics
- 💰 **Revenue Tracking**: Monitor total revenue and sales
- 📈 **Order Management**: View and manage all customer orders
- 📦 **Product Overview**: Track total products and inventory
- 📋 **Order Details**: Access detailed order information and customer data

### Technical Features
- ⚡ **Server-Side Rendering**: Fast initial page loads with Next.js
- 🎨 **Modern UI Components**: Built with Radix UI and shadcn/ui
- 🔄 **Real-time Updates**: Dynamic cart and order updates
- 💾 **Local Storage**: Persistent cart and user data
- 🎯 **Type Safety**: Full TypeScript implementation
- 📊 **Analytics**: Integrated Vercel Analytics

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Geist Sans & Mono](https://vercel.com/font)

### State Management
- **Cart Context**: Custom React Context for cart management
- **Auth Context**: Authentication state management
- **Theme Context**: Dark/Light mode management
- **Viewport Context**: Responsive viewport control

### Data & APIs
- **Product API**: [Fake Store API](https://fakestoreapi.com/)
- **Data Storage**: LocalStorage for cart and orders
- **Form Validation**: React Hook Form + Zod

### Development Tools
- **Package Manager**: npm/pnpm
- **Code Quality**: ESLint
- **Analytics**: Vercel Analytics

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **pnpm** package manager
- **Git**

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohammedmudassir-07/Ecom_web.git
   cd Ecom_web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Customer Access
1. **Browse Products**: Visit the homepage to view all available products
2. **Search & Filter**: Use the search bar and category filters to find specific products
3. **Add to Cart**: Click on any product and add it to your cart
4. **Checkout**: Navigate to cart and proceed to checkout
5. **View Orders**: Access your order history from the orders page

### Admin Access
- **Login Credentials**:
  - Email: `admin@shophub.com`
  - Password: `admin123`
- **Access Dashboard**: Navigate to `/admin` after logging in
- **View Analytics**: See revenue, orders, and product statistics
- **Manage Orders**: Review customer orders and details

## 📁 Project Structure

```
Ecom_web/
├── app/                      # Next.js App Router pages
│   ├── admin/               # Admin dashboard page
│   ├── cart/                # Shopping cart page
│   ├── checkout/            # Checkout page
│   ├── login/               # Login page
│   ├── order-confirmation/  # Order confirmation page
│   ├── orders/              # Orders history page
│   ├── products/            # Product detail pages
│   ├── register/            # Registration page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── navbar.tsx           # Navigation bar
│   ├── product-card.tsx     # Product card component
│   └── ...
├── context/                 # React Context providers
│   ├── auth-context.tsx     # Authentication context
│   ├── cart-context.tsx     # Shopping cart context
│   ├── theme-context.tsx    # Theme management
│   └── viewport-context.tsx # Viewport control
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions and types
├── public/                  # Static assets
└── styles/                  # Global styles
```

## 🎨 Key Features Implementation

### Shopping Cart
- Add/remove items with real-time updates
- Quantity management
- Price calculation with totals
- Persistent storage across sessions

### Authentication
- Secure login/logout functionality
- Demo account for testing
- Protected routes for admin access
- User session management

### Product Management
- Dynamic product loading from API
- Category-based filtering
- Search functionality
- Product ratings and reviews

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Viewport mode switching

## 🌙 Theme Support

The application supports both light and dark modes:
- Toggle using the theme switcher in the navbar
- Preference saved in local storage
- Smooth transitions between themes
- System preference detection

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🚢 Deployment

This project is deployed on **Vercel**:

**Live URL**: [https://v0-e-commerce-storefront-five.vercel.app/](https://v0-e-commerce-storefront-five.vercel.app/)

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mohammedmudassir-07/Ecom_web)

1. Click the "Deploy" button above
2. Sign in to Vercel
3. Follow the deployment wizard
4. Your app will be live in minutes!

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Mohammed Mudassir**

- GitHub: [@mohammedmudassir-07](https://github.com/mohammedmudassir-07)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment and hosting
- [Fake Store API](https://fakestoreapi.com/) - Product data
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework

## 📧 Support

For support, email mohammedmudassir07@example.com or open an issue in the GitHub repository.

## 🔄 Project Status

This project is actively maintained and open for contributions. Feel free to report issues or suggest new features!

---

**Built with ❤️ using Next.js and TypeScript**
