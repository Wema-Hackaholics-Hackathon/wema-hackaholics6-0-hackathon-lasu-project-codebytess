'use client';

import { JourneyAnalytics } from "@/components/dashboard/journey-analytics";
import { Route, TrendingUp, Users, Target } from "lucide-react";

interface JourneyTabProps {
  dashboardData: any;
}

export function JourneyTab({ dashboardData }: JourneyTabProps) {
  const journeyData = [
    { step: "Landing Page", users: 10000, dropoffRate: 15, avgTime: "2m 30s", satisfaction: 8.2 },
    { step: "Registration Form", users: 8500, dropoffRate: 25, avgTime: "5m 45s", satisfaction: 7.1 },
    { step: "Document Upload", users: 6375, dropoffRate: 18, avgTime: "3m 20s", satisfaction: 7.8 },
    { step: "Verification", users: 5228, dropoffRate: 12, avgTime: "1m 15s", satisfaction: 8.5 },
    { step: "Account Activation", users: 4600, dropoffRate: 8, avgTime: "45s", satisfaction: 9.1 }
  ];

  const completionRate = ((journeyData[journeyData.length - 1].users / journeyData[0].users) * 100);
  const avgDropoff = journeyData.reduce((sum, step) => sum + step.dropoffRate, 0) / journeyData.length;
  const avgSatisfaction = journeyData.reduce((sum, step) => sum + step.satisfaction, 0) / journeyData.length;

  return (
    <div className="space-y-10">
      {/* Journey Optimization Header */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl p-8 text-white shadow-2xl border border-violet-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
              <Route className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Customer Journey Optimization</h1>
              <p className="text-violet-100 text-xl">User flow analysis and conversion optimization insights</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold">{completionRate.toFixed(1)}%</div>
              <div className="text-violet-200">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{avgDropoff.toFixed(1)}%</div>
              <div className="text-violet-200">Avg Drop-off</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{avgSatisfaction.toFixed(1)}</div>
              <div className="text-violet-200">Avg Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Analytics */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-violet-200/50 overflow-hidden hover:shadow-violet-500/20 transition-all duration-700">
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 p-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Route className="w-7 h-7" />
            </div>
            Account Opening Journey Analysis
            <div className="ml-auto text-violet-200 text-sm">Conversion Funnel</div>
          </h3>
        </div>
        <div className="p-8">
          <JourneyAnalytics journeyData={journeyData} />
        </div>
      </div>

      {/* Journey Step Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
        {journeyData.map((step, index) => {
          const getStepColor = (dropoffRate: number) => {
            if (dropoffRate <= 10) return 'from-green-500 to-emerald-600';
            if (dropoffRate <= 20) return 'from-yellow-500 to-orange-600';
            return 'from-red-500 to-pink-600';
          };

          const getStepStatus = (dropoffRate: number) => {
            if (dropoffRate <= 10) return 'Optimized';
            if (dropoffRate <= 20) return 'Good';
            return 'Needs Focus';
          };

          return (
            <div key={index} className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <div className={`bg-gradient-to-r ${getStepColor(step.dropoffRate)} p-6 text-white`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{step.users.toLocaleString()}</div>
                    <div className="text-sm opacity-90">Users</div>
                  </div>
                </div>
                <h3 className="text-lg font-bold">{step.step}</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Drop-off Rate</span>
                    <span className={`font-semibold ${
                      step.dropoffRate <= 10 ? 'text-green-600' : 
                      step.dropoffRate <= 20 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {step.dropoffRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Avg Time</span>
                    <span className="font-semibold">{step.avgTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Satisfaction</span>
                    <span className="font-semibold text-purple-600">{step.satisfaction}</span>
                  </div>
                  <div className="text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      step.dropoffRate <= 10 ? 'bg-green-100 text-green-800' : 
                      step.dropoffRate <= 20 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {getStepStatus(step.dropoffRate)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Journey Optimization Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-800">Optimization Opportunities</h3>
          </div>
          <div className="space-y-3">
            <div className="text-green-700">
              • Registration Form has highest drop-off (25%)
            </div>
            <div className="text-green-700">
              • Document Upload shows good recovery
            </div>
            <div className="text-green-700">
              • Account Activation has excellent satisfaction
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-blue-800">User Behavior Insights</h3>
          </div>
          <div className="space-y-3">
            <div className="text-blue-700">
              • 46% complete the full journey
            </div>
            <div className="text-blue-700">
              • Average session time: 12m 35s
            </div>
            <div className="text-blue-700">
              • Mobile completion rate: 38%
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl p-8 border border-purple-200/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-purple-800">Recommended Actions</h3>
          </div>
          <div className="space-y-3">
            <div className="text-purple-700">
              • Simplify registration form fields
            </div>
            <div className="text-purple-700">
              • Add progress indicators
            </div>
            <div className="text-purple-700">
              • Implement smart form validation
            </div>
          </div>
        </div>
      </div>

      {/* Journey Performance Summary */}
      <div className="bg-gradient-to-r from-slate-900 via-violet-900 to-purple-900 rounded-3xl p-10 text-white shadow-2xl border border-violet-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-purple-600/10"></div>
        <div className="relative z-10">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-3 flex items-center justify-center gap-3">
              <Route className="w-8 h-8 text-violet-400" />
              Journey Optimization Summary
            </h3>
            <p className="text-violet-200 text-lg">Customer journey analysis and conversion optimization metrics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-green-300 mb-3">{completionRate.toFixed(1)}%</div>
              <div className="text-violet-100 font-semibold text-lg">Completion Rate</div>
              <div className="text-sm text-green-300 mt-2">Above industry average</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-yellow-300 mb-3">{avgDropoff.toFixed(1)}%</div>
              <div className="text-violet-100 font-semibold text-lg">Average Drop-off</div>
              <div className="text-sm text-yellow-300 mt-2">Optimization target</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-purple-300 mb-3">{avgSatisfaction.toFixed(1)}</div>
              <div className="text-violet-100 font-semibold text-lg">Avg Satisfaction</div>
              <div className="text-sm text-purple-300 mt-2">Customer experience</div>
            </div>
            <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
              <div className="text-4xl font-bold text-blue-300 mb-3">{journeyData.length}</div>
              <div className="text-violet-100 font-semibold text-lg">Journey Steps</div>
              <div className="text-sm text-blue-300 mt-2">Conversion funnel</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}