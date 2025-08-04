'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';

interface ErrorPageProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center">
        <Frown className="h-20 w-20 text-red-500 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Something went wrong</h1>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          {error?.message || 'An unexpected error has occurred. Please try again later.'}
        </p>
        <div className="flex gap-4">
          {reset && (
            <Button variant="outline" onClick={() => reset()}>
              Try Again
            </Button>
          )}
          <Link href="/">
            <Button>Go to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 