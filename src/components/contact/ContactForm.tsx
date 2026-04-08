'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { contactSchema, type ContactFormData } from '@/lib/validators';
import { cn } from '@/lib/utils';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-kim-charcoal mb-1.5">{t('name')}</label>
          <input
            {...register('name')}
            className={cn(
              'w-full px-4 py-3 rounded-xl border bg-white text-kim-charcoal placeholder-kim-stone/50 transition-colors focus:outline-none focus:ring-2 focus:ring-kim-navy',
              errors.name ? 'border-kim-error' : 'border-gray-200 hover:border-kim-navy/50'
            )}
            placeholder={t('name')}
          />
          {errors.name && <p className="mt-1 text-xs text-kim-error">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-kim-charcoal mb-1.5">{t('email')}</label>
          <input
            {...register('email')}
            type="email"
            className={cn(
              'w-full px-4 py-3 rounded-xl border bg-white text-kim-charcoal placeholder-kim-stone/50 transition-colors focus:outline-none focus:ring-2 focus:ring-kim-navy',
              errors.email ? 'border-kim-error' : 'border-gray-200 hover:border-kim-navy/50'
            )}
            placeholder={t('email')}
          />
          {errors.email && <p className="mt-1 text-xs text-kim-error">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-kim-charcoal mb-1.5">{t('subject')}</label>
        <input
          {...register('subject')}
          className={cn(
            'w-full px-4 py-3 rounded-xl border bg-white text-kim-charcoal placeholder-kim-stone/50 transition-colors focus:outline-none focus:ring-2 focus:ring-kim-navy',
            errors.subject ? 'border-kim-error' : 'border-gray-200 hover:border-kim-navy/50'
          )}
          placeholder={t('subject')}
        />
        {errors.subject && <p className="mt-1 text-xs text-kim-error">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-kim-charcoal mb-1.5">{t('message')}</label>
        <textarea
          {...register('message')}
          rows={5}
          className={cn(
            'w-full px-4 py-3 rounded-xl border bg-white text-kim-charcoal placeholder-kim-stone/50 transition-colors focus:outline-none focus:ring-2 focus:ring-kim-navy resize-none',
            errors.message ? 'border-kim-error' : 'border-gray-200 hover:border-kim-navy/50'
          )}
          placeholder={t('message')}
        />
        {errors.message && <p className="mt-1 text-xs text-kim-error">{errors.message.message}</p>}
      </div>

      {status === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
          {t('success')}
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
          {t('error')}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3.5 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors disabled:opacity-60"
      >
        {status === 'loading' ? '...' : t('submit')}
      </button>
    </form>
  );
}
