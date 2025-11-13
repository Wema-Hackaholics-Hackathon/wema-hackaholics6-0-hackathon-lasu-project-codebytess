'use client';

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'circle' | 'bar';
  lines?: number;
}

export function LoadingSkeleton({ 
  className, 
  variant = 'card', 
  lines = 3 
}: LoadingSkeletonProps) {
  
  if (variant === 'circle') {
    return (
      <div className={cn(
        "w-12 h-12 rounded-full skeleton-shimmer animate-pulse",
        className
      )} />
    );
  }

  if (variant === 'bar') {
    return (
      <div className={cn(
        "h-4 rounded-lg skeleton-shimmer animate-pulse",
        className
      )} />
    );
  }

  if (variant === 'text') {
    return (
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-4 rounded skeleton-shimmer animate-pulse",
              i === lines - 1 ? "w-3/4" : "w-full",
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn(
      "glass-premium rounded-3xl p-8 animate-pulse",
      className
    )}>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl skeleton-shimmer" />
          <div className="space-y-2 flex-1">
            <div className="h-4 skeleton-shimmer rounded w-1/2" />
            <div className="h-3 skeleton-shimmer rounded w-3/4" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 skeleton-shimmer rounded" />
          <div className="h-4 skeleton-shimmer rounded w-5/6" />
          <div className="h-4 skeleton-shimmer rounded w-4/6" />
        </div>
      </div>
    </div>
  );
}

export function LuxurySpinner({ className }: { className?: string }) {
  return (
    <div className={cn("luxury-spinner mx-auto", className)} />
  );
}