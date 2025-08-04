export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASEURL;

export const API_ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  SEARCH_PRODUCTS: '/products/search',
  PRODUCT_BY_SLUG: (slug: string) => `/products/${slug}`,
  
  // Categories
  CATEGORIES: '/categories',
  CATEGORY_PRODUCTS: (slug: string) => `/categories/${slug}/products`,
  
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  PROFILE: '/auth/profile',
  
  // Orders
  ORDERS: '/orders',
  CREATE_ORDER: '/orders',
  ORDER_BY_ID: (id: number) => `/orders/${id}`,
  
  // Wishlist
  WISHLIST: '/wishlist',
  ADD_TO_WISHLIST: '/wishlist',
  REMOVE_FROM_WISHLIST: (id: number) => `/wishlist/${id}`,
  
  // Support
  SUPPORT_TICKETS: '/support/tickets',
  CREATE_TICKET: '/support/tickets',
} as const;

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  SEARCH: '/search',
  PRODUCT: (slug: string) => `/products/${slug}`,
  CATEGORIES: '/categories',
  CATEGORY: (slug: string) => `/categories/${slug}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  WISHLIST: '/dashboard/wishlist',
  ORDERS: '/dashboard/orders',
  ORDER_DETAILS: (id: number) => `/dashboard/orders/${id}`,
  SUPPORT: '/dashboard/support',
} as const;

export const STORAGE_KEYS = {
  CART: 'nextshop-cart',
  AUTH_TOKEN: 'nextshop-token',
  WISHLIST: 'nextshop-wishlist',
} as const;

export const CACHE_TAGS = {
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  ORDERS: 'orders',
  WISHLIST: 'wishlist',
  USER: 'user',
} as const;