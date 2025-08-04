import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/mock-data';
import ProductDetailsClient from '@/components/products/ProductDetailsClient';

export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  // Find product by slug
  const product = mockProducts.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailsClient product={product} />;
}