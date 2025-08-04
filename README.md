# NextShop – Next.js E-commerce Demo

NextShop is a modern, full-featured e-commerce demo application built with [Next.js 14+](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/). It showcases a premium shopping experience with a beautiful UI, mock data, and a wide range of e-commerce features. This project is ideal for learning, prototyping, or as a starting point for your own online store.

---

## ✨ Features

- **Modern UI/UX**: Responsive, accessible, and visually appealing design using Tailwind CSS and Radix UI components.
- **Product Catalog**: Browse products by category, brand, or search. View detailed product pages with images, ratings, and reviews.
- **Shopping Cart**: Add, remove, and update product quantities. View order summary and proceed to checkout.
- **Checkout Flow**: Simulated checkout with form validation, shipping address, and payment method selection.
- **User Authentication**: Mock login and registration flows with protected dashboard routes.
- **User Dashboard**: Manage orders, wishlist, support tickets, and account settings.
- **Order Management**: View order history, order details, download invoices, and track shipments.
- **Wishlist**: Save favorite products for later and add them to cart.
- **Support Center**: Create and track support tickets, view responses, and access FAQs.
- **Profile & Settings**: Update profile info, change password, manage notification preferences, and billing info.
- **Search**: Full product search with category and brand filters.
- **Mock Data**: All data is local and mock-based for easy prototyping and learning.
- **TypeScript**: Full type safety across the codebase.
- **Component-Driven**: Modular, reusable components for rapid development.

---

## 🚀 Getting Started

### 1. **Clone the repository**

```bash
git clone https://github.com/your-username/next-commerce.git
cd next-commerce
```

### 2. **Install dependencies**

```bash
npm install
# or
yarn install
```

### 3. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## 🛠️ Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm start` – Start the production server
- `npm run lint` – Run ESLint

---

## ⚙️ Environment Variables

This demo uses mock data by default. If you want to connect to a real API, set the following in a `.env.local` file:

```
NEXT_PUBLIC_API_BASEURL=https://your-api-url.com/api
NEXT_IMAGE_BASE_URL=https://your-image-cdn.com/
```

> **Note:** The app will fall back to mock data if these are not set.

---

## 🏗️ Project Structure

```
next-commerce/
├── app/                # Next.js app directory (pages, layouts, routes)
│   ├── auth/           # Login & registration
│   ├── cart/           # Shopping cart
│   ├── categories/     # Category browsing
│   ├── checkout/       # Checkout flow
│   ├── dashboard/      # User dashboard (orders, wishlist, support, settings)
│   ├── products/       # Product catalog & details
│   ├── search/         # Product search
│   └── ...
├── components/         # Reusable UI and feature components
├── config/             # API config
├── hooks/              # Custom React hooks
├── lib/                # Mock data, types, utilities, store
├── public/             # Static assets
├── styles/             # Global styles (Tailwind, CSS)
├── tailwind.config.ts  # Tailwind CSS config
├── postcss.config.js   # PostCSS config
├── tsconfig.json       # TypeScript config
└── package.json        # Project metadata & scripts
```

---

## 🧩 Tech Stack

- [Next.js 14+ (App Router)](https://nextjs.org/)
- [React 18+](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/) (for accessible UI primitives)
- [Zustand](https://zustand-demo.pmnd.rs/) (state management)
- [Zod](https://zod.dev/) (schema validation)
- [React Hook Form](https://react-hook-form.com/) (forms)
- [Lucide Icons](https://lucide.dev/)
- [Sonner](https://sonner.emilkowal.ski/) (toasts/notifications)

---

## 📦 Mock Data

All product, category, order, and support data is stored locally in `lib/mock-data.ts` for demo purposes. No backend is required.

---

## 🙏 Credits

- Inspired by modern e-commerce UIs and open-source Next.js projects.
- Product images from [Pexels](https://pexels.com/).
- Built with ❤️ by Devs.Shakil.

---

## 📄 License

This project is for educational and demo purposes. Feel free to use, modify, and share! 