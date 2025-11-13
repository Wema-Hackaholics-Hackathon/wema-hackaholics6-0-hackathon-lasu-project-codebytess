'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ errorInfo });
    
    // Send error to tracking service
    if (typeof window !== 'undefined') {
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          url: window.location.href,
          userAgent: window.navigator.userAgent,
          timestamp: new Date().toISOString(),
          severity: 'high',
          tags: { boundary: 'react-error-boundary' }
        })
      }).catch(console.error);
    }

    console.error('Error caught by boundary:', error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback;
      
      if (FallbackComponent && this.state.error) {
        return <FallbackComponent error={this.state.error} retry={this.retry} />;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50/30 to-indigo-50/20 p-4">
          <div className="max-w-md w-full">
            <div className="glass-premium rounded-2xl p-8 border border-purple-200/40 shadow-2xl">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                
                <h1 className="text-xl font-bold text-gray-900 mb-2">
                  Something went wrong
                </h1>
                
                <p className="text-gray-600 mb-6">
                  We've encountered an unexpected error. Our team has been notified and is working on a fix.
                </p>

                {this.state.error && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <p className="text-sm font-medium text-gray-700 mb-2">Error Details:</p>
                    <p className="text-xs text-gray-600 font-mono break-all">
                      {this.state.error.message}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    onClick={this.retry}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                  </button>
                  
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Reload Page
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}