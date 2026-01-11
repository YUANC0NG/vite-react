const API_BASE = '/proxy';

export const gateAPI = {
  tickers: `${API_BASE}/api2/1/tickers`,
  ticker: (symbol: string) => `${API_BASE}/api2/1/ticker?symbol=${symbol}`,
  orderBook: (symbol: string) => `${API_BASE}/api2/1/orderBook?symbol=${symbol}`,
  trades: (symbol: string) => `${API_BASE}/api2/1/trades?symbol=${symbol}`
};