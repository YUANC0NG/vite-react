import { config } from './config';
import { getCorsProxy, checkCorsSupport } from './cors';

// 通用API客户端
export class ApiClient {
  private baseURL: string;
  private useCorsProxy: boolean = false;

  constructor(baseURL: string = '') {
    // 根据环境选择正确的baseURL
    this.baseURL = this.resolveBaseURL(baseURL);
  }

  private resolveBaseURL(requestedURL: string): string {
    // 如果是相对路径（代理路径），在生产环境中转换为绝对URL
    if (requestedURL.startsWith('/')) {
      if (import.meta.env.PROD) {
        return this.getProductionURL(requestedURL);
      }
      return requestedURL;
    }
    
    // 已经是绝对URL，直接使用
    return requestedURL;
  }

  private getProductionURL(proxyPath: string): string {
    // 将代理路径转换为实际的API地址
    const apiMap: Record<string, string> = {
      '/proxy': 'https://data.gateapi.io',
      '/api': 'https://api.coingecko.com'
    };
    
    return apiMap[proxyPath] || proxyPath;
  }

  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      // 生产环境尝试直接请求，如果失败则使用CORS代理
      if (import.meta.env.PROD && !this.useCorsProxy) {
        try {
          return await this.directFetch<T>(endpoint, options);
        } catch (corsError) {
          console.warn('Direct API request failed, trying with CORS proxy:', corsError);
          this.useCorsProxy = true;
          return await this.proxyFetch<T>(endpoint, options);
        }
      }
      
      return await this.directFetch<T>(endpoint, options);
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private async directFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (import.meta.env.PROD) {
      headers['Accept'] = 'application/json';
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }

  private async proxyFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const corsProxy = getCorsProxy();
    const targetUrl = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(`${corsProxy}${encodeURIComponent(targetUrl)}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Proxy request failed! status: ${response.status}`);
    }
    
    return await response.json();
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

// 创建默认客户端实例
export const apiClient = new ApiClient();

// 预配置的客户端实例
export const gateClient = new ApiClient('/proxy');
export const coinGeckoClient = new ApiClient('/api');