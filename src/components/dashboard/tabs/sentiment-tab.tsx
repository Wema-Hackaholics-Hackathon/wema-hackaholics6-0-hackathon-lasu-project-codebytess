'use client';

import { SentimentTrends } from "@/components/dashboard/sentiment-trends";
import { EmotionBreakdown } from "@/components/dashboard/emotion-breakdown";
import { WordCloud } from "@/components/dashboard/word-cloud";
import { TrendingTopics } from "@/components/dashboard/trending-topics";
import { Heart, Zap, Brain, TrendingUp } from "lucide-react";

interface SentimentTabProps {
  dashboardData: any;
}

export function SentimentTab({ dashboardData }: SentimentTabProps) {
  // Provide default values to prevent undefined errors
  const safeData = {
    overallSentiment: dashboardData?.overallSentiment || 0,
    emotionBreakdown: dashboardData?.emotionBreakdown || [],
    trendingTopics: dashboardData?.trendingTopics || [],
    hourlyTrends: dashboardData?.hourlyTrends || [],
    weeklyTrends: dashboardData?.weeklyTrends || []
  };

  return (
    <div className="space-y-10">
      {/* Sentiment Intelligence Header */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl border border-pink-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
              <Heart className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Sentiment Intelligence Suite</h1>
              <p className="text-pink-100 text-xl">Advanced emotion analysis and customer feedback insights</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{safeData.overallSentiment.toFixed(1)}/10</div>
              <div className="text-pink-200">Overall Sentiment</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{safeData.emotionBreakdown[0]?.percentage?.toFixed(1) || '0'}%</div>
              <div className="text-pink-200">Positive Emotions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{safeData.trendingTopics.length}</div>
              <div className="text-pink-200">Trending Topics</div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Sentiment Trends */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/40 overflow-hidden hover:shadow-purple-500/20 transition-all duration-700">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7" />
            </div>
            Real-time Sentiment Intelligence
            <div className="ml-auto text-purple-200 text-sm">Live Analytics</div>
          </h3>
        </div>
        <div className="p-8">
          <SentimentTrends 
            hourlyData={safeData.hourlyTrends}
            weeklyData={safeData.weeklyTrends}
            viewType="hourly"
          />
        </div>
      </div>

      {/* Emotion & Topic Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-gradient-to-br from-white/95 to-blue-50/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-200/40 hover:shadow-blue-500/20 hover:scale-105 transition-all duration-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Emotion Analysis
            </h3>
          </div>
          <div className="p-6">
            <EmotionBreakdown emotions={safeData.emotionBreakdown} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/95 to-green-50/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-200/40 hover:shadow-green-500/20 hover:scale-105 transition-all duration-700 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Trending Keywords
            </h3>
          </div>
          <div className="p-6">
            <WordCloud />
          </div>
        </div>
      </div>

      {/* Trending Topics Analysis */}
      <div className="bg-gradient-to-br from-white/95 to-purple-50/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/40 hover:shadow-purple-500/20 transition-all duration-700 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7" />
            </div>
            Topic Sentiment Analysis
            <div className="ml-auto text-purple-200 text-sm">Customer Feedback Insights</div>
          </h3>
        </div>
        <div className="p-8">
          <TrendingTopics topics={safeData.trendingTopics} />
        </div>
      </div>

      {/* Sentiment Insights Summary */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 rounded-3xl p-10 text-white shadow-2xl border border-purple-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 via-transparent to-indigo-600/10"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
              <Heart className="w-8 h-8 text-pink-400" />
              Sentiment Intelligence Summary
            </h3>
            <p className="text-purple-200 text-lg">Advanced emotion detection and customer satisfaction metrics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-green-300 mb-3">
                {safeData.emotionBreakdown.filter((e: any) => e.emotion === 'Joy' || e.emotion === 'Satisfaction').reduce((sum: number, e: any) => sum + e.percentage, 0).toFixed(1)}%
              </div>
              <div className="text-purple-100 font-semibold text-lg">Positive Sentiment</div>
              <div className="text-sm text-green-300 mt-2">Above industry average</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-yellow-300 mb-3">
                {safeData.emotionBreakdown.find((e: any) => e.emotion === 'Neutral')?.percentage?.toFixed(1) || '0'}%
              </div>
              <div className="text-purple-100 font-semibold text-lg">Neutral Feedback</div>
              <div className="text-sm text-yellow-300 mt-2">Conversion opportunity</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-red-300 mb-3">
                {safeData.emotionBreakdown.filter((e: any) => e.emotion === 'Frustration' || e.emotion === 'Anger').reduce((sum: number, e: any) => sum + e.percentage, 0).toFixed(1)}%
              </div>
              <div className="text-purple-100 font-semibold text-lg">Negative Sentiment</div>
              <div className="text-sm text-red-300 mt-2">Requires attention</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}