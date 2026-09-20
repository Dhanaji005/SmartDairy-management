import React from 'react';
import { 
  LayoutDashboard, 
  Milk, 
  HeartPulse, 
  Wheat, 
  DollarSign, 
  Bot, 
  X,
  Layers
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'cows', label: 'Cow Management', icon: Layers, badge: null },
    { id: 'milk', label: 'Milk Production', icon: Milk, badge: 'Daily' },
    { id: 'health', label: 'Health & Vaccine', icon: HeartPulse, badge: 'Alerts' },
    { id: 'finance', label: 'Financial Records', icon: DollarSign, badge: null },
    { id: 'advisor', label: 'AI Farm Advisor', icon: Bot, badge: 'Smart' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5 font-bold text-lg tracking-wide text-white">
            <span className="text-2xl">🌱</span>
            <span>SmartDairy</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Farm Management
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${isActive 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Banner */}
        <div className="p-4 border-t border-slate-800 m-3 rounded-xl bg-slate-800/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <span>✨</span> Ready for Mobile App
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            REST API endpoints are decoupled and optimized for Android / iOS app integration.
          </p>
        </div>
      </aside>
    </>
  );
}
