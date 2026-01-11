const API_BASE = '/api';

export const coinGeckoAPI = {
  markets: `${API_BASE}/v3/coins/markets`,
  detail: (id: string) => `${API_BASE}/v3/coins/${id}`,
  search: (query: string) => `${API_BASE}/v3/search?query=${query}`
};