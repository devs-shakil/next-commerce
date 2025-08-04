import React from 'react'

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse bg-gray-100 rounded-lg h-48 w-full flex flex-col p-4">
      <div className="bg-gray-300 h-24 w-full rounded mb-4" />
      <div className="bg-gray-300 h-4 w-2/3 rounded mb-2" />
      <div className="bg-gray-300 h-4 w-1/3 rounded" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-8">
            <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
