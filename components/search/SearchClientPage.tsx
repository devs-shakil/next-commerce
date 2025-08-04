'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/products/ProductCard';
import { Product, Category, SearchFilters } from '@/lib/types';

interface SearchClientPageProps {
  products: Product[];
  categories: Category[];
}

export default function SearchClientPage({ products, categories }: SearchClientPageProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>({
    query: initialQuery,
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
    rating: undefined,
    brand: '',
    sortBy: 'name',
  });

  // Update search when URL params change
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, query }));
  }, [searchParams]);

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let results = products;

    // Search by query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      results = results.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      results = results.filter(product => product.categorySlug === filters.category);
    }

    // Filter by price range
    if (filters.minPrice !== undefined) {
      results = results.filter(product => product.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      results = results.filter(product => product.price <= filters.maxPrice!);
    }

    // Filter by rating
    if (filters.rating !== undefined) {
      results = results.filter(product => product.rating >= filters.rating!);
    }

    // Filter by brand
    if (filters.brand) {
      results = results.filter(product => product.brand === filters.brand);
    }

    // Sort results
    results.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return results;
  }, [products, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, query: searchQuery }));
  };

  const clearFilter = (filterKey: keyof SearchFilters) => {
    setFilters(prev => ({ 
      ...prev, 
      [filterKey]: filterKey === 'sortBy' ? 'name' : (filterKey === 'category' || filterKey === 'brand' ? '' : undefined)
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      query: searchQuery,
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
      rating: undefined,
      brand: '',
      sortBy: 'name',
    });
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
    key !== 'query' && key !== 'sortBy' && value !== undefined && value !== ''
  ).length;

  const availableBrands = Array.from(new Set(products.map(p => p.brand).filter((brand): brand is string => Boolean(brand))));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Products</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </h3>
            {activeFiltersCount > 0 && (
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Select value={filters.category || 'all'} onValueChange={(value) => 
                setFilters(prev => ({ ...prev, category: value === 'all' ? '' : value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.slug} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <Select value={filters.brand || 'all'} onValueChange={(value) => 
                setFilters(prev => ({ ...prev, brand: value === 'all' ? '' : value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="All brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All brands</SelectItem>
                  {availableBrands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
              <Input
                type="number"
                placeholder="$0"
                value={filters.minPrice || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  minPrice: e.target.value ? parseFloat(e.target.value) : undefined 
                }))}
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
              <Input
                type="number"
                placeholder="$1000"
                value={filters.maxPrice || ''}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  maxPrice: e.target.value ? parseFloat(e.target.value) : undefined 
                }))}
              />
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
              <Select value={filters.sortBy || 'name'} onValueChange={(value) => 
                setFilters(prev => ({ ...prev, sortBy: value as any }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium text-gray-700 mb-2">Active filters:</p>
              <div className="flex flex-wrap gap-2">
                {filters.category && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {categories.find(c => c.slug === filters.category)?.name}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => clearFilter('category')}
                    />
                  </Badge>
                )}
                {filters.brand && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Brand: {filters.brand}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => clearFilter('brand')}
                    />
                  </Badge>
                )}
                {filters.minPrice !== undefined && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Min: ${filters.minPrice}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => clearFilter('minPrice')}
                    />
                  </Badge>
                )}
                {filters.maxPrice !== undefined && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Max: ${filters.maxPrice}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => clearFilter('maxPrice')}
                    />
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filters.query ? (
            <>Showing {filteredProducts.length} results for "<strong>{filters.query}</strong>"</>
          ) : (
            <>Showing {filteredProducts.length} products</>
          )}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search terms or filters
          </p>
          <Button onClick={clearAllFilters}>Clear all filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}