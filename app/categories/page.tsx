import { mockCategories } from '@/lib/mock-data';
import CategoriesClientPage from '@/components/categories/CategoriesClientPage';

export default function CategoriesPage() {
  return (
    <CategoriesClientPage categories={mockCategories} />
  );
}