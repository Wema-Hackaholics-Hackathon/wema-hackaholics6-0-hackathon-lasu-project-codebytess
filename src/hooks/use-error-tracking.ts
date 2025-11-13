'use client';

import { useEffect, useCallback } from 'react';

interface ErrorTrackingOptions {
  userId?: string;
  sessionId?: string;
  enableConsoleCapture?: boolean;
  enableNetworkCapture?: boolean;
}

export function useErrorTracking(options: ErrorTrackingOptions = {}) {
  const { userId, sessionId, enableConsoleCapture = true, enableNetworkCapture = true } = options;

  const captureError = useCallback((error: Error, context?: Record<string, any>) => {
    const errorData = {
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: error.message,
      stack: error.stack,
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      timestamp: new Date().toISOString(),
      userId,
      sessionId: sessionId || `session_${Date.now()}`,
      severity: 'medium' as const,
      context
    };

    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData)
    }).catch(console.error);

    return errorData;
  }, [userId, sessionId]);

  const trackPageView = useCallback((url?: string) => {
    const pageData = {
      url: url || (typeof window !== 'undefined' ? window.location.href : ''),
      title: typeof document !== 'undefined' ? document.title : '',
      timestamp: new Date().toISOString(),
      userId,
      sessionId: sessionId || `session_${Date.now()}`,
      referrer: typeof document !== 'undefined' ? document.referrer : ''
    };

    fetch('/api/analytics/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: pageData.sessionId,
        userId: pageData.userId,
        pages: [pageData],
        errors: [],
        startTime: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : ''
      })
    }).catch(console.error);
  }, [userId, sessionId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleError = (event: ErrorEvent) => {
      captureError(new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason instanceof Error 
        ? event.reason 
        : new Error(String(event.reason));
      
      captureError(error, { type: 'unhandled_promise_rejection' });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    trackPageView();

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [captureError, trackPageView]);

  return {
    captureError,
    trackPageView
  };
}