export interface TickerData {
    result: string;
    last: string;
    lowestAsk: string;
    highestBid: string;
    percentChange: string;
    baseVolume: string;
    quoteVolume: string;
    high24hr: string;
    low24hr: string;
}

export type TickersResponse = Record<string, TickerData>;

export interface CoinInfo extends TickerData {
    symbol: string; // e.g. "btc_usdt"
    base: string;   // e.g. "BTC"
    quote: string;  // e.g. "USDT"
}
