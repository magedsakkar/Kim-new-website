'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { volunteerSchema, type VolunteerFormData } from '@/lib/validators';
import { cn } from '@/lib/utils';

export function VolunteerForm() {
  const t = useTranslations('volunteer.form');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
  });

  const onSubmit = async (data: VolunteerFormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'volunteer' }),
      });
      if (res.ok) {
        setStatus('success');
        reset();
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const fields = [
    { key: 'name', type: 'text', label: t('name') },
    { key: 'email', type: 'email', label: t('email') },
    { key: 'phone', type: 'tel', label: t('phone') },
    { key: 'profession', type: 'text', label: t('profession') },
  ] as const;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map((field) => (
          <div key={field.key}>
            <label htmlFor={`volunteer-${field.key}`} className="block text-sm font-medium text-kim-charcoal mb-1.5">{field.label}</label>
            <input
              id={`volunteer-${field.key}`}
              {...register(field.key)}
              type={field.type}
              className={cn(
                'w-full px-4 py-3 rounded-xl border bg-white text-kim-charcoal placeholder-kim-stone/50 transition-colors focus:outline-none focus:ring-2 focus:ring-kim-navy',
                errors[field.key] ? 'border-kim-error' : 'border-gray-200 hover:border-kim-navy/50'
              )}
              placeholder={field.label}
            />
            {errors[field.key] && (
              <p className="mt-1 text-xs text-kim-error">{errors[field.key]?.message}</p>
            )}
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="volunteer-motivation" className="block text-sm font-medium text-kim-charcoal mb-1.5">{t('motivation')}</label>
        <textarea
          id="volunteer-motivation"
          {...register('motivation')}
          rows={4}
          className={cn(
            'w-full px-4 py-3 rounded-xl border bg-white text-kim-charcoal placeholder-kim-stone/50 transition-colors focus:outline-none focus:ring-2 focus:ring-kim-navy resize-none',
            errors.motivation ? 'border-kim-error' : 'border-gray-200 hover:border-kim-navy/50'
          )}
          placeholder={t('motivation')}
        />
        {errors.motivation && <p className="mt-1 text-xs text-kim-error">{errors.motivation.message}</p>}
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
