import { mockProducts, mockCategories } from '@/lib/mock-data';
import ProductsClientPage from '@/components/products/ProductsClientPage';

export default function ProductsPage() {
  return (
    <ProductsClientPage 
      products={mockProducts}
      categories={mockCategories}
    />
  );
}