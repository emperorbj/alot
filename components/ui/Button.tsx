import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  type = 'button',
  isLoading = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={cn(
        'px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400', 
        isLoading ? 'opacity-50 cursor-not-allowed' : '', // Corrected this line
        className
      )}
      {...props}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}