import { AnimatedProgress } from "./animated-progress";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  color?: string;
}

export function Progress({ value, max = 100, className, color }: ProgressProps) {
  return (
    <AnimatedProgress 
      value={value} 
      max={max} 
      className={className}
      gradient="primary"
      size="md"
    />
  );
}