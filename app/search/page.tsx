import { mockProducts, mockCategories } from '@/lib/mock-data';
import SearchClientPage from '@/components/search/SearchClientPage';

export default function SearchPage() {
  return (
    <SearchClientPage 
      products={mockProducts}
      categories={mockCategories}
    />
  );
}