// Mock data service for development and fallback
import { DashboardStats, Alert, Feedback, SentimentAnalysis } from './types/api';

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
const MOCK_DELAY = parseInt(process.env.NEXT_PUBLIC_MOCK_DELAY || '1000');

// Mock data generators
export const mockDashboardStats: DashboardStats = {
  totalFeedback: 1247,
  averageRating: 4.2,
  sentimentScore: 0.73,
  responseRate: 0.89,
  
  // Trends (24h change)
  feedbackTrend: 0.12,
  ratingTrend: -0.05,
  sentimentTrend: 0.08,
  responseTrend: 0.03,
  
  // Channel breakdown
  channelStats: [
    { channel: 'IN_APP_SURVEY', count: 456, avgRating: 4.3, sentiment: 0.75 },
    { channel: 'CHATBOT', count: 234, avgRating: 4.1, sentiment: 0.68 },
    { channel: 'VOICE_CALL', count: 189, avgRating: 4.0, sentiment: 0.72 },
    { channel: 'SOCIAL_MEDIA', count: 156, avgRating: 3.8, sentiment: 0.65 },
    { channel: 'EMAIL', count: 123, avgRating: 4.4, sentiment: 0.78 },
    { channel: 'WEB_FORM', count: 89, avgRating: 4.2, sentiment: 0.71 }
  ],
  
  // Time-based metrics
  hourlyStats: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    feedbackCount: Math.floor(Math.random() * 50) + 10,
    avgSentiment: 0.5 + Math.random() * 0.4,
    avgRating: 3.5 + Math.random() * 1.5
  })),
  
  // Top issues
  topIssues: [
    { topic: 'Login Issues', count: 45, sentiment: 0.32, trend: 0.15 },
    { topic: 'Transaction Delays', count: 38, sentiment: 0.28, trend: -0.08 },
    { topic: 'App Performance', count: 32, sentiment: 0.45, trend: 0.22 },
    { topic: 'Customer Service', count: 28, sentiment: 0.67, trend: -0.12 },
    { topic: 'Feature Requests', count: 24, sentiment: 0.78, trend: 0.05 }
  ]
};

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'SENTIMENT_SPIKE',
    severity: 'HIGH',
    status: 'OPEN',
    title: 'Negative Sentiment Spike Detected',
    message: 'Unusual increase in negative feedback about login issues in the last 2 hours',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    threshold: { metric: 'sentiment', value: 0.3, operator: 'lt' },
    dataSnapshot: { currentValue: 0.25, previousValue: 0.72 }
  },
  {
    id: '2',
    type: 'HIGH_VOLUME_NEGATIVE',
    severity: 'MEDIUM',
    status: 'OPEN',
    title: 'High Volume of Negative Feedback',
    message: 'Chatbot channel receiving unusually high negative feedback',
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    threshold: { metric: 'negative_count', value: 20, operator: 'gt' },
    dataSnapshot: { currentValue: 28, previousValue: 12 }
  },
  {
    id: '3',
    type: 'TRENDING_TOPIC',
    severity: 'LOW',
    status: 'OPEN',
    title: 'New Trending Topic: Mobile App Update',
    message: 'Increased mentions of mobile app update issues',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    threshold: { metric: 'topic_mentions', value: 15, operator: 'gt' },
    dataSnapshot: { currentValue: 18, previousValue: 3 }
  }
];

export const mockFeedback: Feedback[] = [
  {
    id: '1',
    customerId: 'cust_001',
    channel: 'IN_APP_SURVEY',
    rating: 5,
    comment: 'Great new features in the latest update! Love the improved UI.',
    metadata: { transactionId: 'txn_12345', page: '/dashboard' },
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    sentimentAnalysis: {
      id: 'sent_1',
      feedbackId: '1',
      sentiment: 'VERY_POSITIVE',
      confidence: 0.92,
      emotions: { joy: 0.8, satisfaction: 0.7, surprise: 0.3 },
      primaryEmotion: 'JOY',
      keyPhrases: ['great new features', 'improved UI', 'love'],
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    }
  },
  {
    id: '2',
    customerId: 'cust_002',
    channel: 'CHATBOT',
    rating: 2,
    comment: 'Having trouble logging in for the past hour. Very frustrating!',
    metadata: { sessionId: 'chat_67890', issue: 'login_problem' },
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    sentimentAnalysis: {
      id: 'sent_2',
      feedbackId: '2',
      sentiment: 'NEGATIVE',
      confidence: 0.87,
      emotions: { frustration: 0.9, anger: 0.6, confusion: 0.4 },
      primaryEmotion: 'FRUSTRATION',
      keyPhrases: ['trouble logging in', 'very frustrating'],
      createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString()
    }
  }
];

// Mock API delay simulation
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
  async getDashboardStats(timeRange?: string): Promise<DashboardStats> {
    await delay(MOCK_DELAY);
    return mockDashboardStats;
  },

  async getAlerts(status?: string): Promise<Alert[]> {
    await delay(MOCK_DELAY);
    return status ? mockAlerts.filter(alert => alert.status === status) : mockAlerts;
  },

  async getFeedback(): Promise<{ data: Feedback[], total: number, page: number, limit: number }> {
    await delay(MOCK_DELAY);
    return {
      data: mockFeedback,
      total: mockFeedback.length,
      page: 1,
      limit: 20
    };
  },

  async resolveAlert(id: string, resolution: string): Promise<Alert> {
    await delay(MOCK_DELAY);
    const alert = mockAlerts.find(a => a.id === id);
    if (!alert) throw new Error('Alert not found');
    
    return {
      ...alert,
      status: 'RESOLVED',
      resolution,
      resolvedAt: new Date().toISOString(),
      resolvedBy: 'current_user'
    };
  },

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    await delay(500);
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  }
};

// Check if we should use mock data
export function shouldUseMockData(): boolean {
  // Use mock data if explicitly enabled OR if Railway is not connected
  const railwayEnabled = process.env.NEXT_PUBLIC_RAILWAY_BACKEND === 'true';
  const mockEnabled = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';
  
  // If Railway is enabled but mock is explicitly disabled, don't use mock
  if (railwayEnabled && !mockEnabled) {
    return false;
  }
  
  // Otherwise use mock data as fallback
  return mockEnabled || !railwayEnabled;
}