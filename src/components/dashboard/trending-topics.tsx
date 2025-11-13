'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatNumber } from "@/lib/utils";

interface TrendingTopic {
  topic: string;
  sentiment: number;
  mentions: number;
}

interface TrendingTopicsProps {
  topics: TrendingTopic[];
}

export function TrendingTopics({ topics }: TrendingTopicsProps) {
  if (!topics || topics.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            No trending topics available
          </div>
        </CardContent>
      </Card>
    );
  }

  const maxMentions = Math.max(...topics.map(t => t.mentions));

  const getSentimentColor = (sentiment: number) => {
    if (sentiment >= 8) return "bg-green-500";
    if (sentiment >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getSentimentText = (sentiment: number) => {
    if (sentiment >= 8) return "Positive";
    if (sentiment >= 6) return "Neutral";
    return "Negative";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topics.map((topic, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="font-medium text-gray-900">{topic.topic}</div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getSentimentColor(topic.sentiment)}`}>
                  {getSentimentText(topic.sentiment)}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {formatNumber(topic.mentions)} mentions
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Progress 
                value={topic.mentions} 
                max={maxMentions} 
                className="flex-1"
                color="bg-purple-600"
              />
              <div className="text-sm font-medium text-purple-600">
                {topic.sentiment.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}