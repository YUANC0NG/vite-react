import React from 'react';
import { useStore } from '../stores/useStore';
import { ChevronRight, Percent, Palette } from 'lucide-react';

export const SettingsPage: React.FC = () => {
    const { colorScheme, setColorScheme } = useStore();

    const handleColorSchemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setColorScheme(e.target.value as 'red-up' | 'green-up');
    };

    return (
        <div className="flex flex-col min-h-screen bg-background text-text-primary">
            <header className="h-12 flex items-center px-4 border-b border-border bg-card sticky top-0 z-10">
                <h1 className="text-lg font-bold">设置</h1>
            </header>

            <main className="flex-1 overflow-y-auto p-4 space-y-6">
                <section>
                    <h2 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2 ml-1">偏好设置</h2>
                    <div className="bg-card rounded-xl overflow-hidden border border-border">
                        <div className="flex items-center justify-between p-4 border-b border-border/50 last:border-0 hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-rise/20 flex items-center justify-center text-rise">
                                    <Percent size={18} />
                                </div>
                                <div>
                                    <div className="font-medium">涨跌颜色</div>
                                    <div className="text-xs text-text-secondary">设置价格涨跌的显示颜色</div>
                                </div>
                            </div>
                            <div className="relative">
                                <select
                                    value={colorScheme}
                                    onChange={handleColorSchemeChange}
                                    className="appearance-none bg-background/50 border border-border rounded-lg px-3 py-1.5 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-rise/50"
                                >
                                    <option value="red-up">红涨绿跌</option>
                                    <option value="green-up">绿涨红跌</option>
                                </select>
                                <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary" size={14} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border-b border-border/50 last:border-0 hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                    <Palette size={18} />
                                </div>
                                <div>
                                    <div className="font-medium">主题</div>
                                    <div className="text-xs text-text-secondary">当前仅支持深色模式</div>
                                </div>
                            </div>
                            <span className="text-xs text-text-secondary">深色</span>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xs font-medium text-text-secondary uppercase tracking-wider mb-2 ml-1">关于</h2>
                    <div className="bg-card rounded-xl overflow-hidden border border-border">
                        <div className="flex items-center justify-between p-4 border-b border-border/50 last:border-0 hover:bg-white/5 transition-colors">
                            <div className="font-medium">版本</div>
                            <span className="text-sm text-text-secondary">v1.0.0</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
