'use client';

import { TrendingTopics } from "@/components/dashboard/trending-topics";
import { EmotionBreakdown } from "@/components/dashboard/emotion-breakdown";
import { WordCloud } from "@/components/dashboard/word-cloud";
import { NPSScore } from "@/components/dashboard/nps-score";
import { BarChart3, Brain, TrendingUp, Target } from "lucide-react";

interface AnalyticsTabProps {
  dashboardData: any;
}

export function AnalyticsTab({ dashboardData }: AnalyticsTabProps) {
  // Provide default values to prevent undefined errors
  const safeData = {
    trendingTopics: dashboardData?.trendingTopics || [],
    emotionBreakdown: dashboardData?.emotionBreakdown || []
  };

  return (
    <div className="space-y-10">
      {/* Analytics Intelligence Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
              <BarChart3 className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Customer Analytics Intelligence</h1>
              <p className="text-indigo-100 text-xl">Advanced behavioral insights and predictive analytics</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{safeData.trendingTopics.length}</div>
              <div className="text-indigo-200">Trending Topics</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{safeData.emotionBreakdown.length}</div>
              <div className="text-indigo-200">Emotion Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">42</div>
              <div className="text-indigo-200">NPS Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">15+</div>
              <div className="text-indigo-200">Key Insights</div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10">
        <div className="bg-gradient-to-br from-white/95 to-purple-50/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/40 hover:shadow-purple-500/20 hover:scale-105 transition-all duration-700 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Topic Analysis
            </h3>
          </div>
          <div className="p-6">
            <TrendingTopics topics={safeData.trendingTopics} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/95 to-blue-50/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue-200/40 hover:shadow-blue-500/20 hover:scale-105 transition-all duration-700 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Brain className="w-6 h-6" />
              Emotion Intelligence
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
              Keyword Insights
            </h3>
          </div>
          <div className="p-6">
            <WordCloud />
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/95 to-yellow-50/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-yellow-200/40 hover:shadow-yellow-500/20 hover:scale-105 transition-all duration-700 overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="w-6 h-6" />
              NPS Analytics
            </h3>
          </div>
          <div className="p-6">
            <NPSScore />
          </div>
        </div>
      </div>

      {/* Advanced Insights Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl p-8 border border-gray-200/50 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Behavioral Insights</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-gray-200/50">
              <div className="text-sm text-gray-600 mb-1">Peak Activity Hours</div>
              <div className="text-xl font-bold text-gray-800">2PM - 4PM</div>
              <div className="text-xs text-green-600">+23% engagement</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200/50">
              <div className="text-sm text-gray-600 mb-1">Most Active Channel</div>
              <div className="text-xl font-bold text-gray-800">Mobile App</div>
              <div className="text-xs text-blue-600">67% of interactions</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200/50">
              <div className="text-sm text-gray-600 mb-1">Customer Segment</div>
              <div className="text-xl font-bold text-gray-800">Premium Users</div>
              <div className="text-xs text-purple-600">Highest satisfaction</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-3xl p-8 border border-purple-200/50 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Predictive Analytics</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-purple-200/50">
              <div className="text-sm text-gray-600 mb-1">Churn Risk</div>
              <div className="text-xl font-bold text-red-600">3.2%</div>
              <div className="text-xs text-red-600">↓ 0.8% from last month</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-purple-200/50">
              <div className="text-sm text-gray-600 mb-1">Satisfaction Trend</div>
              <div className="text-xl font-bold text-green-600">↗ Improving</div>
              <div className="text-xs text-green-600">+5.2% this quarter</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-purple-200/50">
              <div className="text-sm text-gray-600 mb-1">Next Week Forecast</div>
              <div className="text-xl font-bold text-blue-600">8.1 Score</div>
              <div className="text-xs text-blue-600">95% confidence</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-3xl p-8 border border-emerald-200/50 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Action Recommendations</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 border border-emerald-200/50">
              <div className="text-sm font-medium text-emerald-800 mb-2">High Priority</div>
              <div className="text-sm text-gray-700">Optimize mobile app login flow</div>
              <div className="text-xs text-emerald-600 mt-1">Expected +12% satisfaction</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-emerald-200/50">
              <div className="text-sm font-medium text-yellow-800 mb-2">Medium Priority</div>
              <div className="text-sm text-gray-700">Reduce call center wait times</div>
              <div className="text-xs text-yellow-600 mt-1">Expected +8% satisfaction</div>
            </div>
            <div className="bg-white rounded-xl p-4 border border-emerald-200/50">
              <div className="text-sm font-medium text-blue-800 mb-2">Low Priority</div>
              <div className="text-sm text-gray-700">Enhance chatbot responses</div>
              <div className="text-xs text-blue-600 mt-1">Expected +4% satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Performance Summary */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-blue-900 rounded-3xl p-10 text-white shadow-2xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-transparent to-blue-600/10"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
              <BarChart3 className="w-8 h-8 text-indigo-400" />
              Advanced Analytics Summary
            </h3>
            <p className="text-indigo-200 text-lg">Machine learning insights and predictive customer behavior analytics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-green-300 mb-3">94.2%</div>
              <div className="text-indigo-100 font-semibold text-lg">Prediction Accuracy</div>
              <div className="text-sm text-green-300 mt-2">ML model performance</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-blue-300 mb-3">127</div>
              <div className="text-indigo-100 font-semibold text-lg">Data Points</div>
              <div className="text-sm text-blue-300 mt-2">Real-time analysis</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-purple-300 mb-3">15</div>
              <div className="text-indigo-100 font-semibold text-lg">Key Insights</div>
              <div className="text-sm text-purple-300 mt-2">Actionable recommendations</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-cyan-300 mb-3">24/7</div>
              <div className="text-indigo-100 font-semibold text-lg">Monitoring</div>
              <div className="text-sm text-cyan-300 mt-2">Continuous intelligence</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}