'use client';

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedProgressProps {
  value: number;
  max?: number;
  className?: string;
  showValue?: boolean;
  gradient?: 'primary' | 'success' | 'warning' | 'luxury';
  size?: 'sm' | 'md' | 'lg';
}

export function AnimatedProgress({ 
  value, 
  max = 100, 
  className,
  showValue = false,
  gradient = 'primary',
  size = 'md'
}: AnimatedProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const gradientClasses = {
    primary: 'bg-gradient-to-r from-purple-500 via-purple-600 to-indigo-600',
    success: 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600',
    warning: 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500',
    luxury: 'bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600'
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={cn("w-full", className)}>
      <div className={cn(
        "progress-animated",
        sizeClasses[size]
      )}>
        <div 
          className={cn(
            "progress-bar",
            gradientClasses[gradient]
          )}
          style={{ width: `${animatedValue}%` }}
        />
      </div>
      {showValue && (
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showValue?: boolean;
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className,
  showValue = true
}: CircularProgressProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(107, 70, 193, 0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B46C1" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
        </defs>
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">
            {Math.round(animatedValue)}%
          </span>
        </div>
      )}
    </div>
  );
}