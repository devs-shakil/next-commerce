import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center">
        <AlertTriangle className="h-20 w-20 text-yellow-500 mb-6" />
        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button size="lg">Go to Homepage</Button>
        </Link>
      </div>
    </div>
  );
} 