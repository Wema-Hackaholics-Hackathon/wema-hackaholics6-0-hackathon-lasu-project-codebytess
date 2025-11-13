'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info, AlertCircle, Clock } from "lucide-react";

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  severity: 'high' | 'medium' | 'low';
}

interface RealtimeAlertsProps {
  alerts: Alert[];
}

export function RealtimeAlerts({ alerts }: RealtimeAlertsProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getAlertBorder = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Real-time Alerts
        </CardTitle>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Live</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 max-h-96 overflow-y-auto scrollbar-hide">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border-l-4 p-4 rounded-r-lg ${getAlertBorder(alert.type)} animate-slide-in`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {alert.message}
                  </p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{formatTimeAgo(alert.timestamp)}</span>
                    <span className="mx-2">•</span>
                    <span className="capitalize">{alert.severity} priority</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {alerts.length > 0 && (
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {alerts.filter(a => a.type === 'critical').length} critical, {' '}
                {alerts.filter(a => a.type === 'warning').length} warnings, {' '}
                {alerts.filter(a => a.type === 'info').length} info
              </span>
              <button className="text-purple-600 hover:text-purple-800 font-medium">
                View All
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}