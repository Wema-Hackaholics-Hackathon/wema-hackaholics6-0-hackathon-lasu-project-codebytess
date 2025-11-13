'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface WordCloudProps {
  words?: Array<{ text: string; weight: number; sentiment: 'positive' | 'negative' | 'neutral' }>;
}

export function WordCloud({ words = [] }: WordCloudProps) {
  const [animatedWords, setAnimatedWords] = useState<typeof words>([]);

  const defaultWords = [
    { text: "fast", weight: 95, sentiment: 'positive' as const },
    { text: "secure", weight: 88, sentiment: 'positive' as const },
    { text: "easy", weight: 82, sentiment: 'positive' as const },
    { text: "convenient", weight: 76, sentiment: 'positive' as const },
    { text: "reliable", weight: 71, sentiment: 'positive' as const },
    { text: "slow", weight: 45, sentiment: 'negative' as const },
    { text: "confusing", weight: 38, sentiment: 'negative' as const },
    { text: "helpful", weight: 69, sentiment: 'positive' as const },
    { text: "efficient", weight: 73, sentiment: 'positive' as const },
    { text: "user-friendly", weight: 67, sentiment: 'positive' as const },
    { text: "complicated", weight: 42, sentiment: 'negative' as const },
    { text: "smooth", weight: 65, sentiment: 'positive' as const },
    { text: "quick", weight: 78, sentiment: 'positive' as const },
    { text: "excellent", weight: 84, sentiment: 'positive' as const },
    { text: "frustrating", weight: 35, sentiment: 'negative' as const }
  ];

  const wordsToDisplay = words.length > 0 ? words : defaultWords;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWords(wordsToDisplay);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600 hover:text-green-700';
      case 'negative':
        return 'text-red-600 hover:text-red-700';
      default:
        return 'text-gray-600 hover:text-gray-700';
    }
  };

  const getFontSize = (weight: number) => {
    const minSize = 12;
    const maxSize = 32;
    const normalizedWeight = Math.min(Math.max(weight, 0), 100);
    return minSize + (normalizedWeight / 100) * (maxSize - minSize);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Trending Keywords
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-2 p-4">
            {animatedWords.map((word, index) => (
              <span
                key={index}
                className={`
                  font-medium cursor-pointer transition-all duration-300 hover:scale-110
                  ${getSentimentColor(word.sentiment)}
                  animate-slide-in
                `}
                style={{
                  fontSize: `${getFontSize(word.weight)}px`,
                  animationDelay: `${index * 100}ms`
                }}
                title={`${word.text} - ${word.weight}% relevance`}
              >
                {word.text}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-600 rounded"></div>
            <span className="text-gray-600">Positive</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded"></div>
            <span className="text-gray-600">Negative</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-600 rounded"></div>
            <span className="text-gray-600">Neutral</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}