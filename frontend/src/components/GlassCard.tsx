import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass-card p-6 glow-border transition-shadow duration-[2000ms]',
        hover && 'hover:shadow-lg hover:shadow-accent/10 hover:border-accent/30',
        className
      )}
    >
      {children}
    </div>
  );
}
