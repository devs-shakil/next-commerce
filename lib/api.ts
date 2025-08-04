import { API_ENDPOINTS, CACHE_TAGS } from './constants';
import { Product, Category, Order, SupportTicket, SearchFilters } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Generic fetch wrapper with caching
async function fetchWithCache<T>(
  endpoint: string,
  options: RequestInit & { 
    tags?: string[];
    revalidate?: number;
  } = {}
): Promise<T> {
  const { tags, revalidate, ...fetchOptions } = options;
  
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...fetchOptions,
    next: {
      tags,
      revalidate,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// Products API
export const productsApi = {
  getAll: (filters?: SearchFilters) => {
    const params = new URLSearchParams();
    if (filters?.query) params.append('q', filters.query);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.minPrice) params.append('min_price', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('max_price', filters.maxPrice.toString());
    if (filters?.rating) params.append('rating', filters.rating.toString());
    if (filters?.brand) params.append('brand', filters.brand);
    if (filters?.sortBy) params.append('sort', filters.sortBy);
    
    const queryString = params.toString();
    const endpoint = `${API_ENDPOINTS.PRODUCTS}${queryString ? `?${queryString}` : ''}`;
    
    return fetchWithCache<Product[]>(endpoint, {
      tags: [CACHE_TAGS.PRODUCTS],
      revalidate: 300, // 5 minutes
    });
  },

  getBySlug: (slug: string) =>
    fetchWithCache<Product>(API_ENDPOINTS.PRODUCT_BY_SLUG(slug), {
      tags: [CACHE_TAGS.PRODUCTS, `product-${slug}`],
      revalidate: 600, // 10 minutes
    }),

  search: (query: string, filters?: SearchFilters) => {
    const params = new URLSearchParams({ q: query });
    if (filters?.category) params.append('category', filters.category);
    if (filters?.minPrice) params.append('min_price', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('max_price', filters.maxPrice.toString());
    if (filters?.rating) params.append('rating', filters.rating.toString());
    if (filters?.brand) params.append('brand', filters.brand);
    if (filters?.sortBy) params.append('sort', filters.sortBy);
    
    return fetchWithCache<Product[]>(`${API_ENDPOINTS.SEARCH_PRODUCTS}?${params.toString()}`, {
      tags: [CACHE_TAGS.PRODUCTS, 'search'],
      revalidate: 180, // 3 minutes
    });
  },
};

// Categories API
export const categoriesApi = {
  getAll: () =>
    fetchWithCache<Category[]>(API_ENDPOINTS.CATEGORIES, {
      tags: [CACHE_TAGS.CATEGORIES],
      revalidate: 3600, // 1 hour
    }),

  getBySlug: (slug: string) =>
    fetchWithCache<Category>(`/categories/${slug}`, {
      tags: [CACHE_TAGS.CATEGORIES, `category-${slug}`],
      revalidate: 3600, // 1 hour
    }),

  getProducts: (slug: string, filters?: SearchFilters) => {
    const params = new URLSearchParams();
    if (filters?.minPrice) params.append('min_price', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('max_price', filters.maxPrice.toString());
    if (filters?.rating) params.append('rating', filters.rating.toString());
    if (filters?.brand) params.append('brand', filters.brand);
    if (filters?.sortBy) params.append('sort', filters.sortBy);
    
    const queryString = params.toString();
    const endpoint = `${API_ENDPOINTS.CATEGORY_PRODUCTS(slug)}${queryString ? `?${queryString}` : ''}`;
    
    return fetchWithCache<Product[]>(endpoint, {
      tags: [CACHE_TAGS.PRODUCTS, CACHE_TAGS.CATEGORIES, `category-${slug}-products`],
      revalidate: 300, // 5 minutes
    });
  },
};

// Orders API
export const ordersApi = {
  getAll: (token: string) =>
    fetchWithCache<Order[]>(API_ENDPOINTS.ORDERS, {
      headers: { Authorization: `Bearer ${token}` },
      tags: [CACHE_TAGS.ORDERS],
      revalidate: 60, // 1 minute
    }),

  getById: (id: number, token: string) =>
    fetchWithCache<Order>(API_ENDPOINTS.ORDER_BY_ID(id), {
      headers: { Authorization: `Bearer ${token}` },
      tags: [CACHE_TAGS.ORDERS, `order-${id}`],
      revalidate: 60, // 1 minute
    }),

  create: (orderData: any, token: string) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.CREATE_ORDER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    }).then(res => res.json()),
};

// Support API
export const supportApi = {
  getTickets: (token: string) =>
    fetchWithCache<SupportTicket[]>(API_ENDPOINTS.SUPPORT_TICKETS, {
      headers: { Authorization: `Bearer ${token}` },
      tags: ['support'],
      revalidate: 60, // 1 minute
    }),

  createTicket: (ticketData: any, token: string) =>
    fetch(`${API_BASE_URL}${API_ENDPOINTS.CREATE_TICKET}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ticketData),
    }).then(res => res.json()),
};

// Cache revalidation helpers
export const revalidateCache = {
  products: () => fetch('/api/revalidate?tag=products', { method: 'POST' }),
  categories: () => fetch('/api/revalidate?tag=categories', { method: 'POST' }),
  orders: () => fetch('/api/revalidate?tag=orders', { method: 'POST' }),
  wishlist: () => fetch('/api/revalidate?tag=wishlist', { method: 'POST' }),
};