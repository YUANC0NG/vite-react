import React from 'react';
import { Search, X, LayoutGrid, List, Plus } from 'lucide-react';

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    viewMode: 'list' | 'grid';
    toggleViewMode: () => void;
    onAddGroup: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    searchQuery,
    setSearchQuery,
    viewMode,
    toggleViewMode,
    onAddGroup
}) => {
    return (
        <div className="flex flex-col p-4 bg-background gap-4 border-b border-border">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-text-primary tracking-tight">CoinWatch</h1>
                <div className="flex items-center gap-2">
                    <button
                        onClick={onAddGroup}
                        className="p-2 text-text-secondary hover:text-text-primary active:bg-card rounded-lg transition-colors"
                        title="添加分组"
                    >
                        <Plus size={20} />
                    </button>
                    <button
                        onClick={toggleViewMode}
                        className="p-2 text-text-secondary hover:text-text-primary active:bg-card rounded-lg transition-colors"
                        title={viewMode === 'list' ? '宫格视图' : '列表视图'}
                    >
                        {viewMode === 'list' ? <LayoutGrid size={20} /> : <List size={20} />}
                    </button>
                </div>
            </div>

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索币种 (例如: BTC)"
                    className="w-full bg-card border-none rounded-lg py-2 pl-10 pr-10 text-sm text-text-primary focus:ring-1 focus:ring-rise outline-none transition-all"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};
