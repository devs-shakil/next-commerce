'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { ROUTES } from '@/lib/constants';

export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.LOGIN);
    } else {
      // Redirect to profile page with settings tab
      router.push('/profile?tab=settings');
    }
  }, [isAuthenticated, router]);

  return null;
} 