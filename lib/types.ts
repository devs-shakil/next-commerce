export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  description: string;
  category: string;
  categorySlug: string;
  stock: number;
  rating: number;
  reviews: number;
  brand?: string;
  tags?: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface Order {
  id: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: CartItem[];
  createdAt: string;
  shippingAddress: Address;
}

export interface WishlistItem {
  id: number;
  product: Product;
  addedAt: string;
}

export interface SupportTicket {
  id: number;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  responses?: TicketResponse[];
}

export interface TicketResponse {
  id: number;
  message: string;
  isStaff: boolean;
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface WishlistState {
  items: WishlistItem[];
}

export interface CartState {
  items: CartItem[];
  total: number;
  isOpen: boolean;
}

export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: Address;
  paymentMethod: 'card' | 'paypal';
}

export interface SearchFilters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  brand?: string;
  sortBy?: 'name' | 'price-low' | 'price-high' | 'rating' | 'newest';
}

export interface ProductFilters {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
}