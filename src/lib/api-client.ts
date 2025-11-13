// API client for RT-CX Platform Backend
import { 
  ApiResponse, 
  PaginatedResponse, 
  Feedback, 
  CreateFeedbackDTO, 
  FeedbackFilter,
  DashboardStats,
  Alert,
  SentimentAnalysis,
  Topic,
  User,
  AuthResponse,
  LoginDTO
} from './types/api';
import { shouldUseMockData, mockApi } from './mock-data';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') {
    this.baseURL = baseURL;
    
    // Load token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
    
    console.log('API Client initialized with baseURL:', this.baseURL);
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // Use mock data if enabled or if backend is unavailable
    if (shouldUseMockData()) {
      console.log(`Using mock data for ${endpoint}`);
      // This will be handled by individual methods
      throw new Error('Mock data should be handled by individual methods');
    }

    const url = `${this.baseURL}${endpoint}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'));
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      signal: controller.signal,
      ...options,
    };

    try {
      console.log(`Making API request to: ${url}`);
      const response = await fetch(url, config);
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        throw new Error(errorData.error?.message || errorData.message || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`API response from ${endpoint}:`, data);
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      console.warn(`API Error [${endpoint}] - falling back to mock data:`, error);
      
      // Always fallback to mock data on any error
      throw new Error('FALLBACK_TO_MOCK');
    }
  }

  // Auth methods
  async login(credentials: LoginDTO): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.data?.token) {
      this.token = response.data.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }
    }

    return response.data!;
  }

  async logout(): Promise<void> {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
    }
  }

  // Dashboard methods
  async getDashboardStats(timeRange?: string): Promise<DashboardStats> {
    if (shouldUseMockData()) {
      return await mockApi.getDashboardStats(timeRange);
    }
    
    try {
      const params = timeRange ? `?timeRange=${timeRange}` : '';
      const response = await this.request<DashboardStats>(`/api/v1/dashboard/stats${params}`);
      return response.data!;
    } catch (error) {
      if (error instanceof Error && error.message === 'FALLBACK_TO_MOCK') {
        return await mockApi.getDashboardStats(timeRange);
      }
      throw error;
    }
  }

  async getSentimentTrends(days: number = 7): Promise<any[]> {
    const response = await this.request<any[]>(`/api/v1/dashboard/sentiment-trends?days=${days}`);
    return response.data!;
  }

  async getChannelPerformance(): Promise<any[]> {
    const response = await this.request<any[]>('/api/v1/dashboard/channel-performance');
    return response.data!;
  }

  async getEmotionBreakdown(): Promise<any[]> {
    const response = await this.request<any[]>('/api/v1/dashboard/emotion-breakdown');
    return response.data!;
  }

  async getGeographicData(): Promise<any[]> {
    const response = await this.request<any[]>('/api/v1/dashboard/geographic');
    return response.data!;
  }

  async getJourneyAnalytics(): Promise<any> {
    const response = await this.request<any>('/api/v1/dashboard/journey-analytics');
    return response.data!;
  }

  // Feedback methods
  async getFeedback(filters?: FeedbackFilter, page: number = 1, limit: number = 20): Promise<PaginatedResponse<Feedback>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });
    
    const response = await this.request<PaginatedResponse<Feedback>>(`/api/v1/feedback?${params}`);
    return response.data!;
  }

  async createFeedback(feedback: CreateFeedbackDTO): Promise<Feedback> {
    const response = await this.request<Feedback>('/api/v1/feedback', {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
    return response.data!;
  }

  async getFeedbackById(id: string): Promise<Feedback> {
    const response = await this.request<Feedback>(`/api/v1/feedback/${id}`);
    return response.data!;
  }

  // Alert methods
  async getAlerts(status?: string): Promise<Alert[]> {
    if (shouldUseMockData()) {
      return await mockApi.getAlerts(status);
    }
    
    try {
      const params = status ? `?status=${status}` : '';
      const response = await this.request<Alert[]>(`/api/v1/alerts${params}`);
      return response.data!;
    } catch (error) {
      if (error instanceof Error && error.message === 'FALLBACK_TO_MOCK') {
        return await mockApi.getAlerts(status);
      }
      throw error;
    }
  }

  async updateAlert(id: string, updates: Partial<Alert>): Promise<Alert> {
    const response = await this.request<Alert>(`/api/v1/alerts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
    return response.data!;
  }

  async resolveAlert(id: string, resolution: string): Promise<Alert> {
    if (shouldUseMockData()) {
      return await mockApi.resolveAlert(id, resolution);
    }
    
    try {
      const response = await this.request<Alert>(`/api/v1/alerts/${id}/resolve`, {
        method: 'POST',
        body: JSON.stringify({ resolution }),
      });
      return response.data!;
    } catch (error) {
      if (error instanceof Error && error.message === 'FALLBACK_TO_MOCK') {
        return await mockApi.resolveAlert(id, resolution);
      }
      throw error;
    }
  }

  // Topic methods
  async getTopics(): Promise<Topic[]> {
    const response = await this.request<Topic[]>('/api/v1/topics');
    return response.data!;
  }

  async getTrendingTopics(hours: number = 24): Promise<any[]> {
    const response = await this.request<any[]>(`/api/v1/topics/trending?hours=${hours}`);
    return response.data!;
  }

  // Real-time methods
  async getRealtimeMetrics(): Promise<any> {
    const response = await this.request<any>('/api/v1/dashboard/realtime');
    return response.data!;
  }

  // Error tracking methods
  async reportError(errorData: any): Promise<void> {
    await this.request('/api/v1/errors', {
      method: 'POST',
      body: JSON.stringify(errorData),
    });
  }

  async getErrorStats(): Promise<any> {
    const response = await this.request<any>('/api/v1/errors/stats');
    return response.data!;
  }

  async getDropOffAnalytics(): Promise<any[]> {
    const response = await this.request<any[]>('/api/v1/analytics/drop-off');
    return response.data!;
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    if (shouldUseMockData()) {
      return await mockApi.healthCheck();
    }
    
    try {
      const response = await this.request<{ status: string; timestamp: string }>('/health');
      return response.data!;
    } catch (error) {
      if (error instanceof Error && error.message === 'FALLBACK_TO_MOCK') {
        return await mockApi.healthCheck();
      }
      throw error;
    }
  }
}

// Create singleton instance
export const apiClient = new ApiClient();
export default apiClient;