// 环境配置
export const config = {
  // API基础URL配置
  api: {
    gate: {
      development: '/proxy',
      production: 'https://data.gateapi.io'
    },
    coinGecko: {
      development: '/api',
      production: 'https://api.coingecko.com'
    }
  },

  // 获取当前环境的API配置
  getApiBaseURL(service: 'gate' | 'coinGecko'): string {
    const isDevelopment = import.meta.env.DEV;
    return this.api[service][isDevelopment ? 'development' : 'production'];
  }
};