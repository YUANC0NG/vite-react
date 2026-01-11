import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
    favorites: string[];
    groups: string[];
    coinGroups: Record<string, string[]>;
    activeGroup: string;
    viewMode: 'list' | 'grid';
    colorScheme: 'red-up' | 'green-up';
    activeTab: 'market' | 'settings';

    // Actions
    toggleFavorite: (symbol: string) => void;
    setActiveGroup: (group: string) => void;
    toggleViewMode: () => void;
    addGroup: (name: string) => void;
    removeGroup: (name: string) => void;
    addToGroup: (group: string, symbol: string) => void;
    removeFromGroup: (group: string, symbol: string) => void;
    reorderFavorites: (newOrder: string[]) => void;
    reorderGroupCoins: (group: string, newOrder: string[]) => void;
    setColorScheme: (scheme: 'red-up' | 'green-up') => void;
    setActiveTab: (tab: 'market' | 'settings') => void;
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            favorites: ['btc_usdt', 'eth_usdt', 'sol_usdt'],
            groups: ['全部', '自选', '主流币'],
            coinGroups: {
                '主流币': ['btc_usdt', 'eth_usdt', 'sol_usdt', 'bnb_usdt'],
            },
            activeGroup: '自选',
            viewMode: 'list',
            colorScheme: 'red-up',
            activeTab: 'market',

            toggleFavorite: (symbol) => set((state) => {
                const index = state.favorites.indexOf(symbol);
                if (index > -1) {
                    return { favorites: state.favorites.filter(s => s !== symbol) };
                } else {
                    return { favorites: [...state.favorites, symbol] };
                }
            }),

            setActiveGroup: (group) => set({ activeGroup: group }),

            toggleViewMode: () => set((state) => ({
                viewMode: state.viewMode === 'list' ? 'grid' : 'list'
            })),

            addGroup: (name) => set((state) => {
                if (state.groups.includes(name)) return state;
                return {
                    groups: [...state.groups, name],
                    coinGroups: { ...state.coinGroups, [name]: [] }
                };
            }),

            removeGroup: (name) => set((state) => {
                if (['全部', '自选'].includes(name)) return state;
                const newGroups = state.groups.filter(g => g !== name);
                const newCoinGroups = { ...state.coinGroups };
                delete newCoinGroups[name];
                return {
                    groups: newGroups,
                    coinGroups: newCoinGroups,
                    activeGroup: state.activeGroup === name ? '全部' : state.activeGroup
                };
            }),

            addToGroup: (group, symbol) => set((state) => {
                const groupList = state.coinGroups[group] || [];
                if (groupList.includes(symbol)) return state;
                return {
                    coinGroups: {
                        ...state.coinGroups,
                        [group]: [...groupList, symbol]
                    }
                };
            }),

            removeFromGroup: (group, symbol) => set((state) => {
                const groupList = state.coinGroups[group] || [];
                return {
                    coinGroups: {
                        ...state.coinGroups,
                        [group]: groupList.filter(s => s !== symbol)
                    }
                };
            }),

            reorderFavorites: (newOrder) => set({ favorites: newOrder }),

            reorderGroupCoins: (group, newOrder) => set((state) => ({
                coinGroups: {
                    ...state.coinGroups,
                    [group]: newOrder
                }
            })),

            setColorScheme: (scheme) => set({ colorScheme: scheme }),
            setActiveTab: (tab) => set({ activeTab: tab }),
        }),
        {
            name: 'coin-watch-storage',
        }
    )
);
