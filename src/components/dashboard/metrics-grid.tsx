'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, formatPercentage } from "@/lib/utils";
import { TrendingUp, TrendingDown, Users, MessageSquare, Clock, Target } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
}

function MetricCard({ title, value, change, icon, trend = 'neutral' }: MetricCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
        <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</CardTitle>
        <div className="text-purple-600 flex-shrink-0">{icon}</div>
      </CardHeader>
      <CardContent className="pt-1 sm:pt-2">
        <div className="text-lg sm:text-2xl font-bold text-gray-900">{value}</div>
        {change !== undefined && (
          <div className={`flex items-center text-xs ${getTrendColor()} mt-1`}>
            {getTrendIcon()}
            <span className="ml-1 truncate">
              {change > 0 ? '+' : ''}{formatPercentage(change)}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface MetricsGridProps {
  data: {
    totalFeedback: number;
    responseRate: number;
    overallSentiment: number;
  };
}

export function MetricsGrid({ data }: MetricsGridProps) {
  const metrics = [
    {
      title: "Total Feedback",
      value: formatNumber(data.totalFeedback),
      change: 12.5,
      trend: 'up' as const,
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      title: "Response Rate",
      value: formatPercentage(data.responseRate),
      change: 3.2,
      trend: 'up' as const,
      icon: <Target className="w-4 h-4" />
    },
    {
      title: "Avg Response Time",
      value: "2.3h",
      change: -8.1,
      trend: 'down' as const,
      icon: <Clock className="w-4 h-4" />
    },
    {
      title: "Active Users",
      value: "127K",
      change: 5.7,
      trend: 'up' as const,
      icon: <Users className="w-4 h-4" />
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
}