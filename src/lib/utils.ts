// Simple className utility without external dependencies
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Mock data generator for development
export function generateMockData() {
  return {
    totalFeedback: 1247,
    averageRating: 4.2,
    sentimentBreakdown: {
      very_positive: 35,
      positive: 30,
      neutral: 20,
      negative: 10,
      very_negative: 5
    },
    trendingTopics: [
      { topic: 'Login Issues', count: 45 },
      { topic: 'App Performance', count: 32 },
      { topic: 'Customer Service', count: 28 }
    ],
    channelPerformance: [
      { channel: 'IN_APP_SURVEY' as const, averageRating: 4.3, count: 456 },
      { channel: 'CHATBOT' as const, averageRating: 4.1, count: 234 },
      { channel: 'VOICE_CALL' as const, averageRating: 4.0, count: 189 },
      { channel: 'SOCIAL_MEDIA' as const, averageRating: 3.8, count: 156 }
    ],
    recentAlerts: [
      {
        id: '1',
        type: 'SENTIMENT_SPIKE',
        severity: 'HIGH',
        status: 'OPEN',
        title: 'Negative sentiment spike detected',
        message: 'Unusual increase in negative feedback',
        threshold: null,
        dataSnapshot: null,
        assignedToId: null,
        resolvedAt: null,
        resolvedBy: null,
        resolution: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    emotionBreakdown: [
      { emotion: 'Joy', percentage: 35 },
      { emotion: 'Satisfaction', percentage: 30 },
      { emotion: 'Neutral', percentage: 20 },
      { emotion: 'Frustration', percentage: 10 },
      { emotion: 'Anger', percentage: 5 }
    ],
    recentFeedback: [
      {
        id: '1',
        userId: null,
        channel: 'IN_APP_SURVEY' as const,
        source: null,
        rating: 5,
        comment: 'Great app update!',
        metadata: null,
        customerSegment: null,
        journeyStage: null,
        processed: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    hourlyTrends: Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      sentiment: 0.5 + Math.random() * 0.4,
      volume: Math.floor(Math.random() * 50) + 10
    })),
    weeklyTrends: Array.from({ length: 7 }, (_, i) => ({
      day: i,
      sentiment: 0.5 + Math.random() * 0.4,
      volume: Math.floor(Math.random() * 300) + 100
    })),
    overallSentiment: 7.2,
    geographicalData: [
      { region: 'Lagos', score: 8.5, volume: 456 },
      { region: 'Abuja', score: 8.2, volume: 234 },
      { region: 'Kano', score: 7.8, volume: 189 },
      { region: 'Port Harcourt', score: 8.1, volume: 167 },
      { region: 'Ibadan', score: 7.9, volume: 145 },
      { region: 'Kaduna', score: 7.6, volume: 123 }
    ]
  };
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatPercentage(num: number): string {
  return `${num.toFixed(1)}%`;
}