'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-kim-cream px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="font-serif text-2xl font-bold text-kim-charcoal mb-3">Something went wrong</h2>
        <p className="text-kim-stone text-sm leading-relaxed mb-8">
          An unexpected error occurred. We apologize for the inconvenience.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-kim-navy text-white font-semibold rounded-xl hover:bg-kim-navy-dark transition-colors text-sm"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
