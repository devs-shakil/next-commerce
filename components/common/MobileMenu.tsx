'use client';

import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store';
import { ROUTES } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          />
          
          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 md:hidden"
          >
            <div className="p-6">
              <div className="space-y-6">
                {/* User Section */}
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3 pb-4 border-b">
                    <div className="bg-gray-200 rounded-full p-2">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex space-x-3 pb-4 border-b">
                    <Link href={ROUTES.LOGIN} onClick={onClose}>
                      <Button variant="outline" className="flex-1">
                        Login
                      </Button>
                    </Link>
                    <Link href={ROUTES.REGISTER} onClick={onClose}>
                      <Button className="flex-1">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="space-y-4">
                  <Link
                    href={ROUTES.HOME}
                    onClick={onClose}
                    className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    href={ROUTES.PRODUCTS}
                    onClick={onClose}
                    className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Products
                  </Link>
                  <Link
                    href={ROUTES.CATEGORIES}
                    onClick={onClose}
                    className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Categories
                  </Link>
                  <Link
                    href="/about"
                    onClick={onClose}
                    className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    About
                  </Link>
                </nav>

                {/* Authenticated User Actions */}
                {isAuthenticated && (
                  <div className="space-y-4 pt-4 border-t">
                    <Link
                      href={ROUTES.DASHBOARD}
                      onClick={onClose}
                      className="block py-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 py-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}