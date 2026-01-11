import React from 'react';
import { Star } from 'lucide-react';
import { CoinInfo } from '../types';
import { cn } from '../utils/cn';
import { PriceDisplay } from './PriceDisplay';

interface CoinGridItemProps {
    coin: CoinInfo;
    isFavorite: boolean;
    onToggleFavorite: (symbol: string) => void;
    attributes?: any;
    listeners?: any;
}

export const CoinGridItem: React.FC<CoinGridItemProps> = ({
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
            className="flex flex-col items-center justify-between p-1.5 bg-card rounded-lg border border-border h-[85px] relative active:scale-95 transition-transform touch-none"
            {...attributes}
            {...listeners}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(coin.symbol);
                }}
                className="absolute top-1 right-1 focus:outline-none z-10"
            >
                <Star
                    size={10}
                    className={cn(
                        "transition-colors",
                        isFavorite ? "fill-yellow-500 text-yellow-500" : "text-text-secondary"
                    )}
                />
            </button>

            <div className="flex flex-col items-center mt-0.5">
                <span className="text-[11px] font-bold text-text-primary leading-tight uppercase">{coin.base}</span>
                <span className="text-[9px] text-text-secondary leading-tight">{coin.quote}</span>
            </div>

            <div className="flex flex-col items-center gap-0.5 w-full mt-auto mb-0.5">
                <PriceDisplay
                    price={coin.last}
                    className="text-[10px] font-medium text-text-primary truncate w-full text-center"
                />
                <div className={cn(
                    "w-full py-0.5 rounded-[3px] text-center text-[9px] font-extrabold text-white shadow-sm",
                    isPositive ? "bg-rise" : "bg-fall"
                )}>
                    {isPositive ? '+' : ''}{coin.percentChange}%
                </div>
            </div>
        </div>
    );
};
