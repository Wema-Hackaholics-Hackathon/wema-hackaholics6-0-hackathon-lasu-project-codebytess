'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SentimentGaugeProps {
  score: number;
  title?: string;
}

export function SentimentGauge({ score, title = "Overall Sentiment" }: SentimentGaugeProps) {
  const getColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getGradient = (score: number) => {
    if (score >= 8) return "from-green-500 to-green-600";
    if (score >= 6) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  const rotation = (score / 10) * 180 - 90;

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative w-48 h-24 mb-4">
          <svg className="w-full h-full" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 20 80 A 80 80 0 0 1 180 80"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            <line
              x1="100"
              y1="80"
              x2="100"
              y2="40"
              stroke="#374151"
              strokeWidth="3"
              strokeLinecap="round"
              transform={`rotate(${rotation} 100 80)`}
              className="transition-transform duration-1000 ease-out"
            />
            <circle cx="100" cy="80" r="4" fill="#374151" />
          </svg>
        </div>
        <div className="text-center">
          <div className={`text-4xl font-bold ${getColor(score)}`}>
            {score.toFixed(1)}
          </div>
          <div className="text-sm text-gray-500 mt-1">out of 10.0</div>
        </div>
      </CardContent>
    </Card>
  );
}