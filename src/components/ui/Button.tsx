'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kim-teal focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg',
          {
            'bg-kim-navy text-white hover:bg-kim-navy-dark active:scale-95 shadow-md hover:shadow-lg': variant === 'primary',
            'bg-kim-gold text-white hover:bg-amber-700 active:scale-95 shadow-md hover:shadow-lg': variant === 'secondary',
            'bg-transparent text-kim-navy hover:bg-kim-navy-light active:scale-95': variant === 'ghost',
            'border-2 border-kim-navy text-kim-navy hover:bg-kim-navy hover:text-white active:scale-95': variant === 'outline',
          },
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
