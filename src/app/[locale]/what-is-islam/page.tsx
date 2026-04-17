import { setRequestLocale } from 'next-intl/server';
import { WhatIsIslamHub } from '@/components/what-is-islam/WhatIsIslamHub';

export default async function WhatIsIslamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WhatIsIslamHub />;
}
