'use client';

import { useState } from "react";
import { 
  BarChart3, 
  Heart, 
  Users, 
  TrendingUp, 
  Map, 
  MessageSquare,
  Target,
  Crown,
  AlertTriangle
} from "lucide-react";

export type TabType = 'overview' | 'sentiment' | 'channels' | 'analytics' | 'geography' | 'journey' | 'crash';

interface NavigationTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  const tabs = [
    {
      id: 'overview' as TabType,
      label: 'Executive Overview',
      icon: Crown,
      description: 'Key metrics and real-time insights'
    },
    {
      id: 'sentiment' as TabType,
      label: 'Sentiment Intelligence',
      icon: Heart,
      description: 'Emotion analysis and feedback trends'
    },
    {
      id: 'channels' as TabType,
      label: 'Channel Performance',
      icon: Target,
      description: 'Multi-channel experience metrics'
    },
    {
      id: 'analytics' as TabType,
      label: 'Customer Analytics',
      icon: BarChart3,
      description: 'Advanced behavioral insights'
    },
    {
      id: 'geography' as TabType,
      label: 'Regional Intelligence',
      icon: Map,
      description: 'Geographic performance analysis'
    },
    {
      id: 'journey' as TabType,
      label: 'Journey Optimization',
      icon: TrendingUp,
      description: 'User flow and conversion analysis'
    },
    {
      id: 'crash' as TabType,
      label: 'Crash Analytics',
      icon: AlertTriangle,
      description: 'Error tracking and drop-off analysis'
    }
  ];

  return (
    <div className="glass-premium rounded-2xl sm:rounded-3xl shadow-2xl border border-purple-200/40 p-2 sm:p-3 overflow-hidden">
      {/* Mobile: Horizontal scrollable tabs */}
      <div className="block sm:hidden">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex-shrink-0 flex flex-col items-center space-y-1 p-3 rounded-xl font-medium transition-all duration-300 min-w-[80px]
                  ${isActive 
                    ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg' 
                    : 'glass-ultra text-gray-700 active:bg-purple-50/50'
                  }
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-purple-600'}`} />
                <div className="text-center">
                  <div className="text-xs font-semibold leading-tight">
                    {tab.label.split(' ')[0]}
                  </div>
                  {tab.label.split(' ').length > 1 && (
                    <div className="text-xs leading-tight">
                      {tab.label.split(' ').slice(1).join(' ')}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tablet: 2x3 grid */}
      <div className="hidden sm:block lg:hidden">
        <div className="grid grid-cols-2 gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center space-x-3 p-3 rounded-xl font-medium transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg' 
                    : 'glass-ultra text-gray-700 hover:bg-purple-50/50 hover:text-purple-700'
                  }
                `}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-purple-600'}`} />
                <div className="text-left min-w-0">
                  <div className="text-sm font-semibold truncate">{tab.label}</div>
                  <div className={`text-xs truncate ${isActive ? 'text-purple-100' : 'text-gray-500'}`}>
                    {tab.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: Full grid layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 xl:grid-cols-6 gap-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  card-morph flex flex-col items-center space-y-2 p-4 rounded-2xl font-medium transition-all duration-500 min-w-0
                  ${isActive 
                    ? 'bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-600 text-white shadow-xl shadow-purple-500/30' 
                    : 'glass-ultra text-gray-700 hover:bg-purple-50/50 hover:text-purple-700 hover:scale-105'
                  }
                `}
              >
                <Icon className={`w-6 h-6 flex-shrink-0 ${isActive ? 'text-white' : 'text-purple-600'}`} />
                <div className="text-center min-w-0">
                  <div className="text-sm font-semibold truncate">{tab.label}</div>
                  <div className={`text-xs truncate ${isActive ? 'text-purple-100' : 'text-gray-500'}`}>
                    {tab.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}