import { useState, useEffect } from 'react';
import { TickersResponse, CoinInfo } from '../types';
import { gateClient } from '../api/client';

const CACHE_KEY = 'coinwatch_tickers_cache';

export function useCoinData(refreshInterval = 5000) {
    const [data, setData] = useState<CoinInfo[]>(() => {
        const cached = localStorage.getItem(CACHE_KEY);
        return cached ? JSON.parse(cached) : [];
    });
    const [loading, setLoading] = useState(data.length === 0);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async (isManual = false) => {
        if (isManual) setLoading(true);
        try {
            const rawData: TickersResponse = await gateClient.get('/api2/1/tickers');

            const formattedData: CoinInfo[] = Object.entries(rawData).map(([symbol, ticker]) => {
                const [base, quote] = symbol.split('_');
                return {
                    ...ticker,
                    symbol,
                    base: base.toUpperCase(),
                    quote: quote.toUpperCase(),
                };
            });

            setData(formattedData);
            localStorage.setItem(CACHE_KEY, JSON.stringify(formattedData));
            setLoading(false);
            setError(null);
        } catch (err) {
            console.error('Fetch error:', err);
            // If we have cached data, don't show error as a full page blocker
            if (data.length === 0) {
                setError('无法获取行情数据');
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const timer = setInterval(() => fetchData(false), refreshInterval);
        return () => clearInterval(timer);
    }, [refreshInterval]);

    return { data, loading, error, refetch: () => fetchData(true) };
}
