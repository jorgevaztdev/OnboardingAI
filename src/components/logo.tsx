import { Brain } from 'lucide-react';
import Link from 'next/link';
import type { FC } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Logo: FC<LogoProps> = ({ size = 'md', className }) => {
  const textSizeClass = size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl';
  const iconSizeClass = size === 'sm' ? 'h-5 w-5' : size === 'md' ? 'h-6 w-6' : 'h-7 w-7';

  return (
    <Link href="/" className={`flex items-center gap-2 text-primary hover:text-primary/90 transition-colors ${className}`}>
      <Brain className={iconSizeClass} />
      <span className={`font-headline font-bold ${textSizeClass}`}>LearnScale AI</span>
    </Link>
  );
};
