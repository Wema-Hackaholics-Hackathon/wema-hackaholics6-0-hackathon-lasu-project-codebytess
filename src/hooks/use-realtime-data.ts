'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';
import { wsClient } from '@/lib/websocket-client';
import { DashboardStats, Alert, Feedback } from '@/lib/types/api';

interface RealtimeDataState {
  dashboardStats: DashboardStats | null;
  alerts: Alert[];
  recentFeedback: Feedback[];
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useRealtimeData() {
  const [state, setState] = useState<RealtimeDataState>({
    dashboardStats: null,
    alerts: [],
    recentFeedback: [],
    isConnected: false,
    isLoading: true,
    error: null
  });

  // Load initial data
  const loadInitialData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));

      const [dashboardStats, alerts] = await Promise.all([
        apiClient.getDashboardStats(),
        apiClient.getAlerts('OPEN')
      ]);

      setState(prev => ({
        ...prev,
        dashboardStats,
        alerts,
        isLoading: false
      }));
    } catch (error) {
      console.error('Failed to load initial data:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to load data',
        isLoading: false
      }));
    }
  }, []);

  // WebSocket event handlers
  const handleMetricUpdate = useCallback((data: DashboardStats) => {
    setState(prev => ({
      ...prev,
      dashboardStats: data
    }));
  }, []);

  const handleNewAlert = useCallback((alert: Alert) => {
    setState(prev => ({
      ...prev,
      alerts: [alert, ...prev.alerts].slice(0, 10) // Keep only latest 10
    }));
  }, []);

  const handleNewFeedback = useCallback((feedback: Feedback) => {
    setState(prev => ({
      ...prev,
      recentFeedback: [feedback, ...prev.recentFeedback].slice(0, 20) // Keep only latest 20
    }));
  }, []);

  // Initialize WebSocket connection
  useEffect(() => {
    const initializeConnection = async () => {
      try {
        // Connect to WebSocket
        await wsClient.connect();
        
        // Subscribe to real-time updates
        wsClient.subscribeToDashboard();
        wsClient.subscribeToAlerts();
        
        // Set up event listeners
        wsClient.on('metric_update', handleMetricUpdate);
        wsClient.on('alert', handleNewAlert);
        wsClient.on('feedback', handleNewFeedback);
        
        setState(prev => ({ ...prev, isConnected: true }));
        
      } catch (error) {
        console.warn('WebSocket connection failed, continuing in offline mode:', error);
        setState(prev => ({
          ...prev,
          isConnected: false
        }));
      }
      
      // Always load initial data regardless of WebSocket status
      await loadInitialData();
    };

    initializeConnection();

    // Cleanup on unmount
    return () => {
      wsClient.off('metric_update', handleMetricUpdate);
      wsClient.off('alert', handleNewAlert);
      wsClient.off('feedback', handleNewFeedback);
    };
  }, [loadInitialData, handleMetricUpdate, handleNewAlert, handleNewFeedback]);

  // Refresh data manually
  const refreshData = useCallback(async () => {
    await loadInitialData();
  }, [loadInitialData]);

  // Resolve alert
  const resolveAlert = useCallback(async (alertId: string, resolution: string) => {
    try {
      await apiClient.resolveAlert(alertId, resolution);
      setState(prev => ({
        ...prev,
        alerts: prev.alerts.filter(alert => alert.id !== alertId)
      }));
    } catch (error) {
      console.error('Failed to resolve alert:', error);
      throw error;
    }
  }, []);

  return {
    ...state,
    refreshData,
    resolveAlert,
    wsClient
  };
}