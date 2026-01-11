import React from 'react';

interface PriceDisplayProps {
    price: string;
    className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, className }) => {
    if (!price || isNaN(parseFloat(price))) return <span className={className}>{price}</span>;

    const numStr = price.toString();

    // Check for leading zeros after decimal
    // e.g., 0.00000123
    const match = numStr.match(/^0\.0{4,}/);

    if (match) {
        const zeros = match[0].length - 2; // Subtract "0."
        const remaining = numStr.slice(match[0].length);

        return (
            <span className={className}>
                0.0
                <sub className="bottom-0 text-[0.7em] ml-[1px] mr-[1px] font-bold">{zeros}</sub>
                {remaining}
            </span>
        );
    }

    return <span className={className}>{price}</span>;
}
