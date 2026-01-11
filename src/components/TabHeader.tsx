import React from 'react';
import { cn } from '../utils/cn';

interface TabHeaderProps {
    groups: string[];
    activeGroup: string;
    onSelect: (group: string) => void;
}

export const TabHeader: React.FC<TabHeaderProps> = ({ groups, activeGroup, onSelect }) => {
    return (
        <div className="flex items-center overflow-x-auto border-b border-border bg-background sticky top-0 z-10 no-scrollbar">
            {groups.map((group) => (
                <button
                    key={group}
                    onClick={() => onSelect(group)}
                    className={cn(
                        "flex-none px-6 py-3 text-sm font-medium transition-all relative",
                        activeGroup === group ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                    )}
                >
                    {group}
                    {activeGroup === group && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-rise mx-4" />
                    )}
                </button>
            ))}
        </div>
    );
};
