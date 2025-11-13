'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, X, CheckCircle, Clock, User, TrendingUp } from 'lucide-react';
import { Alert, AlertSeverity, AlertType } from '@/lib/types/api';

interface LiveAlertsProps {
  alerts: Alert[];
  onResolveAlert: (alertId: string, resolution: string) => Promise<void>;
  className?: string;
}

export function LiveAlerts({ alerts, onResolveAlert, className = '' }: LiveAlertsProps) {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);
  const [resolutionText, setResolutionText] = useState('');
  const [isResolving, setIsResolving] = useState<string | null>(null);

  const getSeverityColor = (severity: AlertSeverity) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 border-red-300 text-red-800';
      case 'HIGH': return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'MEDIUM': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'LOW': return 'bg-blue-100 border-blue-300 text-blue-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getSeverityIcon = (severity: AlertSeverity) => {
    switch (severity) {
      case 'CRITICAL': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'HIGH': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'MEDIUM': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'LOW': return <AlertTriangle className="w-5 h-5 text-blue-600" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: AlertType) => {
    switch (type) {
      case 'SENTIMENT_SPIKE': return <TrendingUp className="w-4 h-4" />;
      case 'HIGH_VOLUME_NEGATIVE': return <AlertTriangle className="w-4 h-4" />;
      case 'TRENDING_TOPIC': return <TrendingUp className="w-4 h-4" />;
      case 'CHANNEL_PERFORMANCE': return <AlertTriangle className="w-4 h-4" />;
      case 'CUSTOMER_CHURN_RISK': return <User className="w-4 h-4" />;
      case 'SYSTEM_ANOMALY': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const handleResolve = async (alertId: string) => {
    if (!resolutionText.trim()) return;
    
    setIsResolving(alertId);
    try {
      await onResolveAlert(alertId, resolutionText);
      setExpandedAlert(null);
      setResolutionText('');
    } catch (error) {
      console.error('Failed to resolve alert:', error);
    } finally {
      setIsResolving(null);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  if (alerts.length === 0) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
        <p className="text-green-800 font-medium">All Clear!</p>
        <p className="text-green-600 text-sm">No active alerts at this time.</p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`border rounded-lg transition-all duration-200 ${getSeverityColor(alert.severity)} ${
            expandedAlert === alert.id ? 'shadow-lg' : 'shadow-sm hover:shadow-md'
          }`}
        >
          {/* Alert Header */}
          <div 
            className="p-4 cursor-pointer"
            onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {getSeverityIcon(alert.severity)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {getTypeIcon(alert.type)}
                    <h3 className="font-semibold text-sm truncate">{alert.title}</h3>
                    <span className="text-xs px-2 py-1 bg-white/50 rounded-full">
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-sm opacity-90 line-clamp-2">{alert.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs opacity-75">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeAgo(alert.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="capitalize">{alert.type.toLowerCase().replace('_', ' ')}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="text-gray-400 hover:text-gray-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedAlert(expandedAlert === alert.id ? null : alert.id);
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expanded Alert Details */}
          {expandedAlert === alert.id && (
            <div className="border-t border-white/30 p-4 bg-white/20">
              {/* Alert Details */}
              <div className="space-y-3 mb-4">
                {alert.dataSnapshot && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Data Snapshot:</h4>
                    <pre className="text-xs bg-white/30 p-2 rounded overflow-x-auto">
                      {JSON.stringify(alert.dataSnapshot, null, 2)}
                    </pre>
                  </div>
                )}
                
                {alert.threshold && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Threshold Configuration:</h4>
                    <pre className="text-xs bg-white/30 p-2 rounded overflow-x-auto">
                      {JSON.stringify(alert.threshold, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Resolution Form */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Resolution Notes:</label>
                  <textarea
                    value={resolutionText}
                    onChange={(e) => setResolutionText(e.target.value)}
                    placeholder="Describe how this alert was resolved..."
                    className="w-full px-3 py-2 text-sm border border-white/30 rounded-md bg-white/50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleResolve(alert.id)}
                    disabled={!resolutionText.trim() || isResolving === alert.id}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isResolving === alert.id ? 'Resolving...' : 'Resolve Alert'}
                  </button>
                  
                  <button
                    onClick={() => {
                      setExpandedAlert(null);
                      setResolutionText('');
                    }}
                    className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}