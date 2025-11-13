'use client';

import { useState, useEffect } from 'react';
import { Wifi, WifiOff, Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { wsClient } from '@/lib/websocket-client';
import { apiClient } from '@/lib/api-client';

interface RealtimeStatusProps {
  isConnected: boolean;
  lastUpdate?: Date;
  className?: string;
}

export function RealtimeStatus({ isConnected, lastUpdate, className = '' }: RealtimeStatusProps) {
  const [latency, setLatency] = useState<number | null>(null);
  const [apiHealth, setApiHealth] = useState<'healthy' | 'degraded' | 'down'>('healthy');

  useEffect(() => {
    const checkLatency = async () => {
      if (!isConnected) return;
      
      const start = Date.now();
      try {
        await apiClient.healthCheck();
        const end = Date.now();
        setLatency(end - start);
        setApiHealth('healthy');
      } catch (error) {
        setLatency(null);
        setApiHealth('down');
      }
    };

    const interval = setInterval(checkLatency, 30000); // Check every 30 seconds
    checkLatency(); // Initial check

    return () => clearInterval(interval);
  }, [isConnected]);

  const getStatusColor = () => {
    if (!isConnected || apiHealth === 'down') return 'text-red-600 bg-red-50 border-red-200';
    if (apiHealth === 'degraded' || (latency && latency > 1000)) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getStatusIcon = () => {
    if (!isConnected || apiHealth === 'down') return <WifiOff className="w-4 h-4" />;
    if (apiHealth === 'degraded') return <AlertCircle className="w-4 h-4" />;
    return <Wifi className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (!isConnected) return 'Disconnected';
    if (apiHealth === 'down') return 'API Down';
    if (apiHealth === 'degraded') return 'Degraded';
    return 'Connected';
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Connection Status */}
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-300 ${getStatusColor()}`}>
        {getStatusIcon()}
        <span>{getStatusText()}</span>
        {isConnected && (
          <Activity className="w-3 h-3 animate-pulse" />
        )}
      </div>

      {/* Latency Indicator */}
      {isConnected && latency !== null && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{latency}ms</span>
        </div>
      )}

      {/* Last Update */}
      {lastUpdate && (
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <CheckCircle className="w-3 h-3" />
          <span>Updated {lastUpdate.toLocaleTimeString()}</span>
        </div>
      )}

      {/* Connection ID */}
      {isConnected && wsClient.connectionId && (
        <div className="text-xs text-gray-400 font-mono">
          ID: {wsClient.connectionId.slice(0, 8)}
        </div>
      )}
    </div>
  );
}