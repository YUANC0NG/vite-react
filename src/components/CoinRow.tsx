import React from 'react';
import { Star } from 'lucide-react';
import { CoinInfo } from '../types';
import { cn } from '../utils/cn';
import { PriceDisplay } from './PriceDisplay';

interface CoinRowProps {
    coin: CoinInfo;
    isFavorite: boolean;
    onToggleFavorite: (symbol: string) => void;
    attributes?: any;
    listeners?: any;
}

export const CoinRow: React.FC<CoinRowProps> = ({
    coin,
    isFavorite,
    onToggleFavorite,
    attributes,
    listeners
}) => {
    const percentChange = parseFloat(coin.percentChange);
    const isPositive = percentChange >= 0;

    return (
        <div
            className="flex items-center justify-between p-3 border-b border-border active:bg-card/50 transition-colors touch-none"
            {...attributes}
            {...listeners}
        >
            <div className="flex items-center gap-3">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(coin.symbol);
                    }}
                    className="focus:outline-none"
                >
                    <Star
                        size={18}
                        className={cn(
                            "transition-colors",
                            isFavorite ? "fill-yellow-500 text-yellow-500" : "text-text-secondary"
                        )}
                    />
                </button>
                <div className="flex flex-col">
                    <div className="flex items-baseline gap-1">
                        <span className="text-md font-bold text-text-primary uppercase">{coin.base}</span>
                        <span className="text-xs text-text-secondary">/{coin.quote}</span>
                    </div>
                    <span className="text-[10px] text-text-secondary">额: {parseFloat(coin.baseVolume).toLocaleString()}</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                    <PriceDisplay
                        price={coin.last}
                        className="text-md font-medium text-text-primary"
                    />
                    <span className="text-[10px] text-text-secondary">≈ ¥{(parseFloat(coin.last) * 7).toFixed(2)}</span>
                </div>

                <div className={cn(
                    "min-w-[75px] py-2 px-1 rounded text-center text-sm font-bold text-white shadow-sm",
                    isPositive ? "bg-rise" : "bg-fall"
                )}>
                    {isPositive ? '+' : ''}{coin.percentChange}%
                </div>
            </div>
        </div>
    );
};
