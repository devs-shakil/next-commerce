import { notFound } from 'next/navigation';
import { mockCategories, mockProducts } from '@/lib/mock-data';
import CategoryClientPage from '@/components/categories/CategoryClientPage';

export async function generateStaticParams() {
  return mockCategories.map((category) => ({
    slug: category.slug,
  }));
}

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  // Find category
  const category = mockCategories.find(c => c.slug === params.slug);
  if (!category) {
    notFound();
  }

  // Get products for this category
  const categoryProducts = mockProducts.filter(p => p.categorySlug === params.slug);

  // Get unique brands for filters
  const brandSet = new Set<string>();
  for (const p of categoryProducts) {
    if (p.brand) brandSet.add(p.brand);
  }
  const availableBrands = Array.from(brandSet);

  return (
    <CategoryClientPage 
      category={category}
      categoryProducts={categoryProducts}
      availableBrands={availableBrands}
    />
  );
}