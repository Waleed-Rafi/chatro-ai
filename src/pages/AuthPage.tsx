
import { Suspense } from 'react';
import Auth from '@/screens/Auth';

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Auth />
    </Suspense>
  );
}
