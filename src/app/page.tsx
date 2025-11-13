'use client';

import { useEffect, useState, useCallback } from "react";
import { AuthProvider } from '@/contexts/auth-context';
import { DashboardHeader } from "@/components/dashboard/header";
import { NavigationTabs, TabType } from "@/components/dashboard/navigation-tabs";
import { OverviewTab } from "@/components/dashboard/tabs/overview-tab";
import { SentimentTab } from "@/components/dashboard/tabs/sentiment-tab";
import { ChannelsTab } from "@/components/dashboard/tabs/channels-tab";
import { AnalyticsTab } from "@/components/dashboard/tabs/analytics-tab";
import { GeographyTab } from "@/components/dashboard/tabs/geography-tab";
import { JourneyTab } from "@/components/dashboard/tabs/journey-tab";
import CrashAnalytics from "@/components/dashboard/tabs/crash-analytics";
import { generateMockData } from "@/lib/utils";
import { useErrorTracking } from "@/hooks/use-error-tracking";
import { useRealtimeData } from "@/hooks/use-realtime-data";
import { Crown, Wifi, WifiOff } from "lucide-react";
import { initializeRailwayConnection, isRailwayDeployment } from "@/lib/railway-config";
import { railwayDemo } from "@/lib/railway-demo";
// import { RailwayStatus } from "@/components/railway-status"; // Temporarily disabled

export default function Home() {
  const [dashboardData, setDashboardData] = useState(generateMockData());
  const [filteredData, setFilteredData] = useState(generateMockData());
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    timeRange: 'Last 24 Hours',
    channel: 'All Channels',
    sentiment: 'All',
    rating: 'All'
  });
  
  // Initialize error tracking
  const { captureError, trackPageView } = useErrorTracking({
    userId: 'demo-user',
    sessionId: `session_${Date.now()}`,
    enableConsoleCapture: true,
    enableNetworkCapture: true
  });

  // Railway connection state
  const [railwayConnected, setRailwayConnected] = useState(false);
  const [railwayInitialized, setRailwayInitialized] = useState(false);

  // Initialize real-time data connection
  const {
    dashboardStats,
    alerts,
    recentFeedback,
    isConnected,
    isLoading,
    error,
    refreshData,
    resolveAlert
  } = useRealtimeData();

  // Filter and search functionality
  const applyFilters = useCallback((data: any, query: string, filterOptions: any) => {
    let filtered = { ...data };
    
    // Apply search filter
    if (query) {
      const searchLower = query.toLowerCase();
      filtered.recentFeedback = filtered.recentFeedback?.filter((feedback: any) => 
        feedback.comment?.toLowerCase().includes(searchLower) ||
        feedback.source?.toLowerCase().includes(searchLower) ||
        feedback.topic?.toLowerCase().includes(searchLower)
      );
      
      filtered.trendingTopics = filtered.trendingTopics?.filter((topic: any) =>
        topic.name?.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply sentiment filter
    if (filterOptions.sentiment !== 'All') {
      filtered.recentFeedback = filtered.recentFeedback?.filter((feedback: any) => 
        feedback.sentiment?.toLowerCase() === filterOptions.sentiment.toLowerCase()
      );
    }
    
    // Apply rating filter
    if (filterOptions.rating !== 'All') {
      filtered.recentFeedback = filtered.recentFeedback?.filter((feedback: any) => 
        feedback.rating === parseInt(filterOptions.rating)
      );
    }
    
    // Apply channel filter
    if (filterOptions.channel !== 'All Channels') {
      filtered.recentFeedback = filtered.recentFeedback?.filter((feedback: any) => 
        feedback.channel?.toLowerCase().includes(filterOptions.channel.toLowerCase().replace(' ', '_'))
      );
    }
    
    return filtered;
  }, []);

  // Update dashboard data when real-time stats are available
  useEffect(() => {
    if (dashboardStats) {
      const newData = {
        ...dashboardData,
        totalFeedback: dashboardStats.totalFeedback,
        averageRating: dashboardStats.averageRating,
        sentimentBreakdown: dashboardStats.sentimentBreakdown,
        trendingTopics: dashboardStats.trendingTopics,
        channelPerformance: dashboardStats.channelPerformance,
        recentAlerts: dashboardStats.recentAlerts
      };
      setDashboardData(newData);
      setFilteredData(applyFilters(newData, searchQuery, filters));
    }
  }, [dashboardStats, searchQuery, filters, applyFilters]);

  // Apply filters when data, search, or filters change
  useEffect(() => {
    setFilteredData(applyFilters(dashboardData, searchQuery, filters));
  }, [dashboardData, searchQuery, filters, applyFilters]);

  // Initialize Railway connection
  useEffect(() => {
    const initRailway = async () => {
      if (isRailwayDeployment()) {
        console.log('🚀 Initializing Railway connection...');
        
        try {
          // Check Railway backend health
          const connected = await initializeRailwayConnection();
          setRailwayConnected(connected);
          
          if (connected) {
            // Initialize demo environment
            const initialized = await railwayDemo.initializeDemoEnvironment();
            setRailwayInitialized(initialized);
            
            if (initialized) {
              console.log('✅ Railway demo environment ready');
            }
          }
        } catch (error) {
          console.error('❌ Railway initialization failed:', error);
          setRailwayConnected(false);
        }
      } else {
        console.log('Using local development environment');
        setRailwayConnected(false);
      }
    };
    
    initRailway();
  }, []);

  // Fallback to mock data updates if no real-time connection
  useEffect(() => {
    if (!isConnected && !isLoading) {
      const interval = setInterval(() => {
        setDashboardData(generateMockData());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [isConnected, isLoading]);

  const renderTabContent = () => {
    const tabProps = {
      dashboardData: filteredData,
      realtimeData: {
        dashboardStats,
        alerts,
        recentFeedback,
        isConnected,
        refreshData,
        resolveAlert
      }
    };

    switch (activeTab) {
      case 'overview':
        return <OverviewTab {...tabProps} />;
      case 'sentiment':
        return <SentimentTab {...tabProps} />;
      case 'channels':
        return <ChannelsTab {...tabProps} />;
      case 'analytics':
        return <AnalyticsTab {...tabProps} />;
      case 'geography':
        return <GeographyTab {...tabProps} />;
      case 'journey':
        return <JourneyTab {...tabProps} />;
      case 'crash':
        return <CrashAnalytics />;
      default:
        return <OverviewTab {...tabProps} />;
    }
  };

  if (isLoading) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent floating"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-transparent"></div>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl floating" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-indigo-400/20 rounded-full blur-2xl floating" style={{animationDelay: '2s'}}></div>
          </div>
          <div className="text-center relative z-10">
            <div className="relative mb-8">
              <div className="luxury-spinner mx-auto" style={{width: '96px', height: '96px'}}></div>
            </div>
            <div className="glass-ultra rounded-3xl p-10 border border-white/30 max-w-md">
              <h2 className="fluid-text-lg font-bold text-white mb-4 flex items-center justify-center gap-3">
                <Crown className="w-8 h-8 text-yellow-300 floating" />
                Wema Bank Executive Dashboard
              </h2>
              <p className="text-purple-100 fluid-text-base mb-6">Initializing premium analytics suite...</p>
              <div className="space-y-4">
                <div className="skeleton-shimmer h-2 rounded-full"></div>
                <div className="skeleton-shimmer h-2 rounded-full w-3/4 mx-auto"></div>
                <div className="skeleton-shimmer h-2 rounded-full w-1/2 mx-auto"></div>
              </div>
              <div className="mt-6 flex justify-center space-x-3">
                <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                <div className="w-3 h-3 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/20 relative">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-indigo-100/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl"></div>
      </div>
      
      <DashboardHeader 
        onSearch={setSearchQuery}
        onFilter={setFilters}
        onRefresh={refreshData}
      />
      
      {/* Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {/* Railway Status */}
        {isRailwayDeployment() && (
          <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            railwayConnected 
              ? 'bg-blue-100 text-blue-800 border border-blue-200' 
              : 'bg-orange-100 text-orange-800 border border-orange-200'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              railwayConnected ? 'bg-blue-500 animate-pulse' : 'bg-orange-500'
            }`}></div>
            <span>{railwayConnected ? 'Railway Connected' : 'Railway Offline'}</span>
          </div>
        )}
        
        {/* WebSocket Status */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          isConnected 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {isConnected ? (
            <>
              <Wifi className="w-4 h-4" />
              <span>Live Data</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4" />
              <span>Offline Mode</span>
            </>
          )}
        </div>
      </div>
      
      <main className="relative z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          
          {/* Railway Status - Temporarily disabled due to build issues */}
          
          {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800">
                <WifiOff className="w-5 h-5" />
                <span className="font-medium">Connection Error:</span>
                <span>{error}</span>
                <button 
                  onClick={refreshData}
                  className="ml-auto px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-sm transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
          
          {/* Tab Content */}
          <div className="animate-slide-in">
            {renderTabContent()}
          </div>
          
          {/* Link to Customer */}
          <div className="mt-8">
            <a href="/customer" className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded">
              Go to Customer Page
            </a>
          </div>
        </div>
      </main>
      </div>
    </AuthProvider>
  );
}
