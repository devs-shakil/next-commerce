import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-6" />
      <h1 className="text-2xl font-semibold text-gray-700 mb-2">Loading...</h1>
      <p className="text-gray-500 text-center max-w-md">
        Please wait while we load your content.
      </p>
    </div>
  );
} 