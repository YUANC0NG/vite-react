import React, { useState, useMemo } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    TouchSensor
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    rectSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { useCoinData } from '../hooks/useCoinData';
import { useStore } from '../stores/useStore';
import { Header } from '../components/Header';
import { CoinRow } from '../components/CoinRow';
import { CoinGridItem } from '../components/CoinGridItem';
import { Loader2 } from 'lucide-react';

interface SortableItemProps {
    id: string;
    coin: any;
    isFavorite: boolean;
    onToggleFavorite: (symbol: string) => void;
    viewMode: 'list' | 'grid';
}

const SortableItem: React.FC<SortableItemProps> = ({
    id,
    coin,
    isFavorite,
    onToggleFavorite,
    viewMode
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 20 : 1,
        opacity: isDragging ? 0.6 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {viewMode === 'list' ? (
                <CoinRow
                    coin={coin}
                    isFavorite={isFavorite}
                    onToggleFavorite={onToggleFavorite}
                    attributes={attributes}
                    listeners={listeners}
                />
            ) : (
                <CoinGridItem
                    coin={coin}
                    isFavorite={isFavorite}
                    onToggleFavorite={onToggleFavorite}
                    attributes={attributes}
                    listeners={listeners}
                />
            )}
        </div>
    );
};

import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';

export const MarketPage: React.FC = () => {
    const { data: allCoins, loading, error } = useCoinData();
    const {
        favorites,
        viewMode,
        toggleFavorite,
        toggleViewMode,
        reorderFavorites,
    } = useStore();

    const [searchQuery, setSearchQuery] = useState('');

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const filteredCoins = useMemo(() => {
        if (!searchQuery) {
            return favorites.map(sym => allCoins.find(c => c.symbol === sym)).filter(Boolean);
        }
        const query = searchQuery.toLowerCase();
        return allCoins.filter(c =>
            c.base.toLowerCase().includes(query) ||
            c.symbol.toLowerCase().includes(query)
        );
    }, [allCoins, searchQuery, favorites]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = favorites.indexOf(active.id as string);
            const newIndex = favorites.indexOf(over.id as string);

            if (oldIndex !== -1 && newIndex !== -1) {
                const newOrder = arrayMove([...favorites], oldIndex, newIndex);
                reorderFavorites(newOrder);
            }
        }
    };

    const isSearchMode = !!searchQuery;

    const renderItem = (index: number, coin: any) => {
        if (!coin) return null;
        const isFavorite = favorites.includes(coin.symbol);

        if (!isSearchMode) {
            return (
                <SortableItem
                    key={coin.symbol}
                    id={coin.symbol}
                    coin={coin}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                    viewMode={viewMode}
                />
            );
        }

        return viewMode === 'list' ? (
            <CoinRow
                key={coin.symbol}
                coin={coin}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
            />
        ) : (
            <CoinGridItem
                key={coin.symbol}
                coin={coin}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
            />
        );
    };

    return (
        <div className="flex flex-col h-full bg-background">
            <Header
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                viewMode={viewMode}
                toggleViewMode={toggleViewMode}
                onAddGroup={() => { }}
            />

            {!searchQuery && favorites.length > 0 && (
                <div className="px-4 py-1 text-[10px] text-text-secondary/50 bg-background/50 border-b border-border/10 flex items-center justify-between">
                    <span>提示: 长按列表项可上下拖拽排序</span>
                </div>
            )}

            <main className="flex-1 overflow-hidden">
                {error && filteredCoins.length === 0 ? (
                    <div className="p-10 text-center text-red-500">{error}</div>
                ) : filteredCoins.length === 0 ? (
                    <div className="p-20 text-center text-text-secondary text-sm">
                        {loading ? (
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="animate-spin" size={24} />
                                <span>正在加载行情数据...</span>
                            </div>
                        ) : (
                            searchQuery ? '未找到匹配的币种' : '自选列表为空，请搜索添加'
                        )}
                    </div>
                ) : !isSearchMode ? (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={filteredCoins.map(c => c!.symbol)}
                            strategy={viewMode === 'list' ? verticalListSortingStrategy : rectSortingStrategy}
                        >
                            <div className={
                                viewMode === 'grid' ? "grid grid-cols-4 gap-2 p-2" : "flex flex-col"
                            }>
                                {filteredCoins.map((coin, index) => renderItem(index, coin))}
                            </div>
                        </SortableContext>
                    </DndContext>
                ) : (
                    viewMode === 'list' ? (
                        <Virtuoso
                            style={{ height: '100%' }}
                            data={filteredCoins}
                            itemContent={(index, coin) => renderItem(index, coin)}
                        />
                    ) : (
                        <VirtuosoGrid
                            style={{ height: '100%' }}
                            data={filteredCoins}
                            listClassName="grid grid-cols-4 gap-2 p-2"
                            itemContent={(index, coin) => renderItem(index, coin)}
                        />
                    )
                )}
            </main>
        </div>
    );
};
