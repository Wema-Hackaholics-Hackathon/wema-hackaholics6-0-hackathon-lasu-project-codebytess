'use client';

import { ChannelPerformance } from "@/components/dashboard/channel-performance";
import { NPSScore } from "@/components/dashboard/nps-score";
import { Target, Smartphone, Phone, MessageCircle, Building } from "lucide-react";

interface ChannelsTabProps {
  dashboardData: any;
}

export function ChannelsTab({ dashboardData }: ChannelsTabProps) {
  const channelIcons = {
    'Mobile App': Smartphone,
    'Call Center': Phone,
    'Chatbot': MessageCircle,
    'Branch': Building
  };

  // Provide default values to prevent undefined errors
  const safeData = {
    channelPerformance: dashboardData?.channelPerformance || []
  };

  return (
    <div className="space-y-10">
      {/* Channel Performance Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl border border-blue-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
              <Target className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Channel Performance Matrix</h1>
              <p className="text-blue-100 text-xl">Multi-channel customer experience optimization</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-8 mt-8">
            {safeData.channelPerformance.map((channel: any, index: number) => {
              const Icon = channelIcons[channel.channel as keyof typeof channelIcons];
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="text-2xl font-bold">{channel.score.toFixed(1)}</div>
                  <div className="text-blue-200 text-sm">{channel.channel}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Channel Performance Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-200/50 overflow-hidden hover:shadow-purple-500/20 transition-all duration-700">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Target className="w-7 h-7" />
                </div>
                Channel Performance Analytics
                <div className="ml-auto text-purple-200 text-sm">Real-time Metrics</div>
              </h3>
            </div>
            <div className="p-8">
              <ChannelPerformance channels={safeData.channelPerformance} />
            </div>
          </div>
        </div>

        <div className="xl:col-span-1">
          <div className="bg-gradient-to-br from-white/95 to-yellow-50/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-yellow-200/40 hover:shadow-yellow-500/20 hover:scale-105 transition-all duration-700 overflow-hidden h-full">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Target className="w-6 h-6" />
                NPS Score
              </h3>
            </div>
            <div className="p-6">
              <NPSScore />
            </div>
          </div>
        </div>
      </div>

      {/* Channel Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {safeData.channelPerformance.map((channel: any, index: number) => {
          const Icon = channelIcons[channel.channel as keyof typeof channelIcons];
          const getScoreColor = (score: number) => {
            if (score >= 8.5) return 'from-green-500 to-emerald-600';
            if (score >= 7.5) return 'from-yellow-500 to-orange-600';
            return 'from-red-500 to-pink-600';
          };
          
          return (
            <div key={index} className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <div className={`bg-gradient-to-r ${getScoreColor(channel.score)} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <Icon className="w-8 h-8" />
                  <div className="text-2xl font-bold">{channel.score.toFixed(1)}</div>
                </div>
                <h3 className="text-lg font-semibold mt-2">{channel.channel}</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Volume</span>
                    <span className="font-semibold">{channel.volume.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Performance</span>
                    <span className={`font-semibold ${
                      channel.score >= 8.5 ? 'text-green-600' : 
                      channel.score >= 7.5 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {channel.score >= 8.5 ? 'Excellent' : 
                       channel.score >= 7.5 ? 'Good' : 'Needs Improvement'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${getScoreColor(channel.score)} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${(channel.score / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Channel Performance Summary */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-10 text-white shadow-2xl border border-blue-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-indigo-600/10"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
              <Target className="w-8 h-8 text-blue-400" />
              Channel Excellence Summary
            </h3>
            <p className="text-blue-200 text-lg">Multi-channel performance optimization and customer satisfaction metrics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-green-300 mb-3">
                {safeData.channelPerformance.length > 0 ? Math.max(...safeData.channelPerformance.map((c: any) => c.score)).toFixed(1) : '0'}
              </div>
              <div className="text-blue-100 font-semibold text-lg">Best Channel Score</div>
              <div className="text-sm text-green-300 mt-2">
                {safeData.channelPerformance.length > 0 ? safeData.channelPerformance.find((c: any) => c.score === Math.max(...safeData.channelPerformance.map((ch: any) => ch.score)))?.channel : 'N/A'}
              </div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-blue-300 mb-3">
                {safeData.channelPerformance.length > 0 ? (safeData.channelPerformance.reduce((sum: number, c: any) => sum + c.score, 0) / safeData.channelPerformance.length).toFixed(1) : '0'}
              </div>
              <div className="text-blue-100 font-semibold text-lg">Average Score</div>
              <div className="text-sm text-blue-300 mt-2">Across all channels</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-purple-300 mb-3">
                {safeData.channelPerformance.reduce((sum: number, c: any) => sum + c.volume, 0).toLocaleString()}
              </div>
              <div className="text-blue-100 font-semibold text-lg">Total Interactions</div>
              <div className="text-sm text-purple-300 mt-2">All channels combined</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-yellow-300 mb-3">
                {safeData.channelPerformance.filter((c: any) => c.score >= 8.0).length}
              </div>
              <div className="text-blue-100 font-semibold text-lg">High Performing</div>
              <div className="text-sm text-yellow-300 mt-2">Channels above 8.0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}