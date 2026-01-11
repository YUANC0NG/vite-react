import { useEffect } from 'react';
import { MarketPage } from './pages/MarketPage'
import { SettingsPage } from './pages/SettingsPage'
import { useStore } from './stores/useStore'
import { TrendingUp, Settings } from 'lucide-react'
import './App.css'

function App() {
  const { activeTab, setActiveTab, colorScheme } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
  }, [colorScheme]);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-background">
      <div className="flex-1 overflow-hidden">
        {activeTab === 'market' ? <MarketPage /> : <SettingsPage />}
      </div>

      <nav className="h-14 bg-card border-t border-border flex items-center justify-around z-40">
        <button
          onClick={() => setActiveTab('market')}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-colors ${activeTab === 'market' ? 'text-rise' : 'text-text-secondary'
            }`}
        >
          <TrendingUp size={20} />
          <span className="text-[10px] font-medium">行情</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 flex-1 py-1 transition-colors ${activeTab === 'settings' ? 'text-rise' : 'text-text-secondary'
            }`}
        >
          <Settings size={20} />
          <span className="text-[10px] font-medium">设置</span>
        </button>
      </nav>
    </div>
  )
}

export default App
