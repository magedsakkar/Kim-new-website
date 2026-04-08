import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

export default async function WhatIsIslamIndex() {
  const locale = await getLocale();
  redirect(`/${locale}/what-is-islam/introduction`);
}
