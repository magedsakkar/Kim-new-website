import { redirect } from 'next/navigation';

// Fallback for root path — middleware should handle this,
// but Next.js 16 routing resolves before middleware in some cases
export default function RootPage() {
  redirect('/tr');
}
