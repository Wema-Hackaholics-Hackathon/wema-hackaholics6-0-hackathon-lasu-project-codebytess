'use client';

import { GeographicalHeatmap } from "@/components/dashboard/geographical-heatmap";
import { Map, MapPin, TrendingUp, Users } from "lucide-react";

interface GeographyTabProps {
  dashboardData: any;
}

export function GeographyTab({ dashboardData }: GeographyTabProps) {
  const geographicalData = dashboardData?.geographicalData || [];
  const topRegion = geographicalData.length > 0 ? geographicalData.sort((a: any, b: any) => b.score - a.score)[0] : { region: 'N/A', score: 0 };
  const totalVolume = geographicalData.reduce((sum: number, region: any) => sum + (region.volume || 0), 0);
  const avgScore = geographicalData.length > 0 ? geographicalData.reduce((sum: number, region: any) => sum + (region.score || 0), 0) / geographicalData.length : 0;

  return (
    <div className="space-y-10">
      {/* Geographic Intelligence Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-8 text-white shadow-2xl border border-emerald-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
              <Map className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Regional Intelligence Center</h1>
              <p className="text-emerald-100 text-xl">Geographic performance analysis and market insights</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{geographicalData.length}</div>
              <div className="text-emerald-200">Active Regions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{avgScore.toFixed(1)}</div>
              <div className="text-emerald-200">National Average</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{totalVolume.toLocaleString()}</div>
              <div className="text-emerald-200">Total Interactions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Regional Performance Map */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-emerald-200/50 overflow-hidden hover:shadow-emerald-500/20 transition-all duration-700">
        <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 p-10">
          <h3 className="text-3xl font-bold text-white flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <Map className="w-8 h-8" />
            </div>
            Regional Performance Intelligence
            <div className="ml-auto text-emerald-200 text-lg font-medium">Executive Overview</div>
          </h3>
        </div>
        <div className="p-10">
          <GeographicalHeatmap regions={geographicalData} />
        </div>
      </div>

      {/* Regional Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {geographicalData
          .sort((a: any, b: any) => (b.score || 0) - (a.score || 0))
          .map((region: any, index: number) => {
            const getRegionGradient = (score: number) => {
              if (score >= 8.5) return 'from-green-500 to-emerald-600';
              if (score >= 8.0) return 'from-emerald-500 to-teal-600';
              if (score >= 7.5) return 'from-teal-500 to-cyan-600';
              if (score >= 7.0) return 'from-cyan-500 to-blue-600';
              return 'from-orange-500 to-red-600';
            };

            const getRank = (index: number) => {
              if (index === 0) return '🥇 #1';
              if (index === 1) return '🥈 #2';
              if (index === 2) return '🥉 #3';
              return `#${index + 1}`;
            };

            return (
              <div key={index} className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500">
                <div className={`bg-gradient-to-r ${getRegionGradient(region.score)} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <MapPin className="w-8 h-8" />
                    <div className="text-lg font-bold">{getRank(index)}</div>
                  </div>
                  <h3 className="text-2xl font-bold">{region.region}</h3>
                  <div className="text-lg opacity-90">Score: {region.score.toFixed(1)}/10</div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Volume
                      </span>
                      <span className="font-semibold text-lg">{region.volume.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Performance
                      </span>
                      <span className={`font-semibold ${
                        region.score >= 8.5 ? 'text-green-600' : 
                        region.score >= 8.0 ? 'text-emerald-600' :
                        region.score >= 7.5 ? 'text-teal-600' :
                        region.score >= 7.0 ? 'text-cyan-600' : 'text-orange-600'
                      }`}>
                        {region.score >= 8.5 ? 'Exceptional' : 
                         region.score >= 8.0 ? 'Excellent' :
                         region.score >= 7.5 ? 'Very Good' :
                         region.score >= 7.0 ? 'Good' : 'Needs Focus'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`bg-gradient-to-r ${getRegionGradient(region.score)} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${(region.score / 10) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-500 text-center">
                      {region.score > avgScore ? '↗️ Above national average' : '↘️ Below national average'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Geographic Intelligence Summary */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-900 to-teal-900 rounded-3xl p-10 text-white shadow-2xl border border-emerald-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 via-transparent to-teal-600/10"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
              <Map className="w-8 h-8 text-emerald-400" />
              Geographic Performance Summary
            </h3>
            <p className="text-emerald-200 text-lg">Regional market analysis and performance optimization insights</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-green-300 mb-3">{topRegion.region}</div>
              <div className="text-emerald-100 font-semibold text-lg">Top Performing Region</div>
              <div className="text-sm text-green-300 mt-2">{topRegion.score.toFixed(1)} score</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-emerald-300 mb-3">{avgScore.toFixed(1)}</div>
              <div className="text-emerald-100 font-semibold text-lg">National Average</div>
              <div className="text-sm text-emerald-300 mt-2">Across all regions</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-teal-300 mb-3">{totalVolume.toLocaleString()}</div>
              <div className="text-emerald-100 font-semibold text-lg">Total Volume</div>
              <div className="text-sm text-teal-300 mt-2">All regions combined</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-cyan-300 mb-3">
                {geographicalData.filter((r: any) => (r.score || 0) > avgScore).length}
              </div>
              <div className="text-emerald-100 font-semibold text-lg">Above Average</div>
              <div className="text-sm text-cyan-300 mt-2">High performing regions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}