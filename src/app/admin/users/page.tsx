'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/users/list');
  }, [router]);

  return null;
}
 
