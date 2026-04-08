import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        {
          'mx-auto text-center': align === 'center',
          'text-left': align === 'left',
          'text-right ml-auto': align === 'right',
        },
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'inline-block text-sm font-semibold uppercase tracking-widest mb-3',
            light ? 'text-kim-gold' : 'text-kim-gold'
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4',
          light ? 'text-white' : 'text-kim-charcoal'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-lg leading-relaxed',
            light ? 'text-white/80' : 'text-kim-stone'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
