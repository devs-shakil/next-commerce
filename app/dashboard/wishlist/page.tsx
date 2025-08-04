'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWishlistStore, useCartStore } from '@/lib/store';
import { ROUTES } from '@/lib/constants';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (product: any) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (productId: number, productName: string) => {
    removeItem(productId);
    toast.success(`${productName} removed from wishlist`);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-24 w-24 text-gray-400 mx-auto mb-8" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
        <p className="text-gray-600 mb-8">
          Save items you love to your wishlist and shop them later.
        </p>
        <Link href={ROUTES.PRODUCTS}>
          <Button size="lg">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">
          {items.length} {items.length === 1 ? 'item' : 'items'} saved for later
        </p>
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative">
              <Link href={ROUTES.PRODUCT(item.product.slug)}>
                <div className="aspect-square relative overflow-hidden rounded-t-lg">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                onClick={() => handleRemoveFromWishlist(item.product.id, item.product.name)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              {item.product.stock <= 5 && (
                <Badge 
                  variant="destructive" 
                  className="absolute top-2 left-2"
                >
                  {item.product.stock <= 0 ? 'Out of Stock' : 'Low Stock'}
                </Badge>
              )}
            </div>

            <CardContent className="p-4">
              <Link href={ROUTES.PRODUCT(item.product.slug)}>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.product.name}
                </h3>
              </Link>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {item.product.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    ${item.product.price}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {item.product.category}
                  </Badge>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => handleAddToCart(item.product)}
                  disabled={item.product.stock <= 0}
                  className="flex-1"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveFromWishlist(item.product.id, item.product.name)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Added {new Date(item.addedAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          onClick={() => {
            items.forEach(item => {
              if (item.product.stock > 0) {
                addItem(item.product);
              }
            });
            toast.success('Available items added to cart!');
          }}
        >
          Add All to Cart
        </Button>
        
        <Link href={ROUTES.PRODUCTS}>
          <Button variant="outline">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}