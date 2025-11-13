// Railway demo service for interacting with demo endpoints
import { apiClient } from './api-client';
import { railwayConfig, getApiUrl } from './railway-config';

export class RailwayDemoService {
  private token: string | null = null;

  // Login with demo credentials
  async loginDemo(): Promise<boolean> {
    try {
      console.log('Logging in with demo credentials...');
      
      const response = await fetch(getApiUrl(railwayConfig.endpoints.auth.login), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(railwayConfig.demoCredentials)
      });

      if (response.ok) {
        const data = await response.json();
        this.token = data.data?.token || data.token;
        
        if (this.token) {
          // Store token for API client
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', this.token);
            localStorage.setItem('refresh_token', data.data?.refreshToken || data.refreshToken);
          }
          
          console.log('✅ Demo login successful');
          return true;
        }
      }
      
      console.error('❌ Demo login failed:', await response.text());
      return false;
    } catch (error) {
      console.error('❌ Demo login error:', error);
      return false;
    }
  }

  // Seed demo data
  async seedDemoData(count: number = 50): Promise<boolean> {
    try {
      if (!this.token) {
        const loginSuccess = await this.loginDemo();
        if (!loginSuccess) return false;
      }

      console.log(`Seeding ${count} demo feedback items...`);
      
      const response = await fetch(getApiUrl(railwayConfig.endpoints.admin.seedDemo), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({
          count,
          organizationId: 'wema-bank'
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Demo data seeded successfully:', data);
        return true;
      }
      
      console.error('❌ Demo data seeding failed:', await response.text());
      return false;
    } catch (error) {
      console.error('❌ Demo data seeding error:', error);
      return false;
    }
  }

  // Get demo stats
  async getDemoStats(): Promise<any> {
    try {
      if (!this.token) {
        const loginSuccess = await this.loginDemo();
        if (!loginSuccess) return null;
      }

      const response = await fetch(getApiUrl(railwayConfig.endpoints.admin.demoStats), {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Demo stats retrieved:', data);
        return data.data || data;
      }
      
      console.error('❌ Failed to get demo stats:', await response.text());
      return null;
    } catch (error) {
      console.error('❌ Demo stats error:', error);
      return null;
    }
  }

  // Reset demo data
  async resetDemoData(): Promise<boolean> {
    try {
      if (!this.token) {
        const loginSuccess = await this.loginDemo();
        if (!loginSuccess) return false;
      }

      console.log('Resetting demo data...');
      
      const response = await fetch(getApiUrl(railwayConfig.endpoints.admin.resetDemo), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      });

      if (response.ok) {
        console.log('✅ Demo data reset successfully');
        return true;
      }
      
      console.error('❌ Demo data reset failed:', await response.text());
      return false;
    } catch (error) {
      console.error('❌ Demo data reset error:', error);
      return false;
    }
  }

  // Initialize demo environment
  async initializeDemoEnvironment(): Promise<boolean> {
    try {
      console.log('🚀 Initializing Railway demo environment...');
      
      // Step 1: Login
      const loginSuccess = await this.loginDemo();
      if (!loginSuccess) {
        console.error('❌ Failed to login with demo credentials');
        return false;
      }

      // Step 2: Check if we already have data
      const stats = await this.getDemoStats();
      
      if (stats && stats.totalFeedback > 0) {
        console.log(`✅ Demo environment already has ${stats.totalFeedback} feedback items`);
        return true;
      }

      // Step 3: Seed demo data
      const seedSuccess = await this.seedDemoData(100);
      if (!seedSuccess) {
        console.error('❌ Failed to seed demo data');
        return false;
      }

      // Step 4: Verify seeding
      const newStats = await this.getDemoStats();
      if (newStats && newStats.totalFeedback > 0) {
        console.log(`✅ Demo environment initialized with ${newStats.totalFeedback} feedback items`);
        return true;
      }

      return false;
    } catch (error) {
      console.error('❌ Failed to initialize demo environment:', error);
      return false;
    }
  }

  // Get current token
  getToken(): string | null {
    return this.token;
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }
}

// Create singleton instance
export const railwayDemo = new RailwayDemoService();
export default railwayDemo;