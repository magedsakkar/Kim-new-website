import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'teal' | 'gold' | 'outline' | 'success';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        {
          'bg-gray-100 text-gray-700': variant === 'default',
          'bg-kim-navy-light text-kim-navy': variant === 'teal',
          'bg-kim-gold-light text-amber-800': variant === 'gold',
          'border border-current text-kim-navy': variant === 'outline',
          'bg-emerald-100 text-emerald-700': variant === 'success',
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
