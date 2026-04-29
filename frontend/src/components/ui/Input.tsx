// Component Input cho form
import { forwardRef, InputHTMLAttributes } from 'react';

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
    helperText?: string;
  }
>(({ className, label, error, helperText, id, ...props }, ref) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`
          w-full px-3 py-2 rounded-lg border transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700'}
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className || ''}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
