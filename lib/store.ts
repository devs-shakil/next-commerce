import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState, AuthState, WishlistState, CartItem, Product, User, WishlistItem } from './types';
import { STORAGE_KEYS } from './constants';

interface CartStore extends CartState {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

interface AuthStore extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (isLoading: boolean) => void;
  updateUser: (user: User) => void;
}

interface WishlistStore extends WishlistState {
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

// Cart Store
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      isOpen: false,
      
      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          let newItems: CartItem[];
          if (existingItem) {
            newItems = state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...state.items, { id: product.id, product, quantity }];
          }
          
          const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          
          return {
            items: newItems,
            total,
            isOpen: true,
          };
        });
      },
      
      removeItem: (productId: number) => {
        set((state) => {
          const newItems = state.items.filter(item => item.id !== productId);
          const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          
          return {
            items: newItems,
            total,
          };
        });
      },
      
      updateQuantity: (productId: number, quantity: number) => {
        set((state) => {
          const newItems = state.items.map(item =>
            item.id === productId ? { ...item, quantity } : item
          );
          const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
          
          return {
            items: newItems,
            total,
          };
        });
      },
      
      clearCart: () => {
        set({ items: [], total: 0, isOpen: false });
      },
      
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },
      
      setIsOpen: (isOpen: boolean) => {
        set({ isOpen });
      },
    }),
    {
      name: STORAGE_KEYS.CART,
      partialize: (state) => ({ items: state.items, total: state.total }),
    }
  )
);

// Auth Store
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
      
      login: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },
      
      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
      
      updateUser: (user: User) => {
        set((state) => ({
          ...state,
          user,
        }));
      },
    }),
    {
      name: STORAGE_KEYS.AUTH_TOKEN,
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);

// Wishlist Store
export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (existingItem) {
            return state; // Already in wishlist
          }
          
          const newItem: WishlistItem = {
            id: product.id,
            product,
            addedAt: new Date().toISOString(),
          };
          
          return {
            items: [...state.items, newItem],
          };
        });
      },
      
      removeItem: (productId: number) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId),
        }));
      },
      
      isInWishlist: (productId: number) => {
        return get().items.some(item => item.product.id === productId);
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: STORAGE_KEYS.WISHLIST,
    }
  )
);