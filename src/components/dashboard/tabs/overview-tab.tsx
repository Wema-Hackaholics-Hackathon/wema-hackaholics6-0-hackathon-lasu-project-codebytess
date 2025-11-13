'use client';

import { SentimentGauge } from "@/components/dashboard/sentiment-gauge";
import { MetricsGrid } from "@/components/dashboard/metrics-grid";
import { RealtimeAlerts } from "@/components/dashboard/realtime-alerts";
import { Crown, Shield } from "lucide-react";

interface OverviewTabProps {
  dashboardData: any;
}

export function OverviewTab({ dashboardData }: OverviewTabProps) {
  // Provide safe defaults for all properties
  const safeData = {
    overallSentiment: dashboardData?.overallSentiment || 7.2,
    responseRate: dashboardData?.responseRate || 89,
    totalFeedback: dashboardData?.totalFeedback || 1247,
    realtimeAlerts: dashboardData?.realtimeAlerts || []
  };

  return (
    <div className="space-y-6 lg:space-y-10">
      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-2xl border border-purple-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16 sm:-translate-y-32 sm:translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full translate-y-12 -translate-x-12 sm:translate-y-24 sm:-translate-x-24"></div>
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center border border-white/30 flex-shrink-0">
                  <Crown className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl sm:text-3xl font-bold">Executive Dashboard</h1>
                  <p className="text-purple-100 text-sm sm:text-lg">Real-time customer experience intelligence</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-end space-x-4 sm:space-x-8">
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold">{safeData.overallSentiment.toFixed(1)}</div>
                <div className="text-purple-200 text-xs sm:text-sm">Satisfaction Score</div>
              </div>
              <div className="w-px h-12 sm:h-16 bg-white/30"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-4xl font-bold">{safeData.responseRate.toFixed(0)}%</div>
                <div className="text-purple-200 text-xs sm:text-sm">Response Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10">
        <div className="lg:col-span-2">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10 shadow-2xl border border-purple-200/40 hover:shadow-purple-500/20 transition-all duration-700">
            <SentimentGauge score={safeData.overallSentiment} />
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10 shadow-2xl border border-purple-200/40">
            <MetricsGrid data={safeData} />
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-red-200/40 overflow-hidden hover:shadow-red-500/20 transition-all duration-700">
        <div className="bg-gradient-to-r from-red-500 to-pink-600 p-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            Critical System Alerts
            <div className="ml-auto text-red-200 text-sm">Live Monitoring</div>
          </h3>
        </div>
        <div className="p-8">
          <RealtimeAlerts alerts={safeData.realtimeAlerts} />
        </div>
      </div>

      {/* Executive Summary Stats */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10 text-white shadow-2xl border border-purple-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-purple-600/10"></div>
        <div className="relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3 flex items-center justify-center gap-2 sm:gap-3">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              Wema Bank Performance Summary
            </h3>
            <p className="text-purple-200 text-sm sm:text-lg">Premium customer experience metrics • Real-time intelligence</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            <div className="text-center p-3 sm:p-6 lg:p-8 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-purple-300 mb-1 sm:mb-3">{safeData.totalFeedback.toLocaleString()}</div>
              <div className="text-purple-100 font-semibold text-xs sm:text-sm lg:text-lg">Total Customer Insights</div>
              <div className="text-xs sm:text-sm text-green-300 mt-1 sm:mt-2">+12.5% growth</div>
            </div>
            <div className="text-center p-3 sm:p-6 lg:p-8 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-green-300 mb-1 sm:mb-3">{safeData.responseRate.toFixed(1)}%</div>
              <div className="text-purple-100 font-semibold text-xs sm:text-sm lg:text-lg">Engagement Excellence</div>
              <div className="text-xs sm:text-sm text-green-300 mt-1 sm:mt-2">Industry leading</div>
            </div>
            <div className="text-center p-3 sm:p-6 lg:p-8 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-blue-300 mb-1 sm:mb-3">2.3h</div>
              <div className="text-purple-100 font-semibold text-xs sm:text-sm lg:text-lg">Response Velocity</div>
              <div className="text-xs sm:text-sm text-blue-300 mt-1 sm:mt-2">-8.1% improvement</div>
            </div>
            <div className="text-center p-3 sm:p-6 lg:p-8 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-yellow-300 mb-1 sm:mb-3">127K</div>
              <div className="text-purple-100 font-semibold text-xs sm:text-sm lg:text-lg">Active Customers</div>
              <div className="text-xs sm:text-sm text-yellow-300 mt-1 sm:mt-2">Premium tier</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}