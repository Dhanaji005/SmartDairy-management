import React from 'react';
import { Bell, Cloud, Menu, ShieldCheck } from 'lucide-react';

export default function Navbar({ onToggleSidebar, activeTab }) {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Mobile menu button & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            title="Toggle Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-green-600 to-emerald-400 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-green-600/20">
              🐄
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                Smart Dairy <span className="text-emerald-600 text-xs font-semibold px-2 py-0.5 bg-emerald-50 rounded-full border border-emerald-200">v1.0</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">Healthy Cows • Better Milk • Smarter Farming</p>
            </div>
          </div>
        </div>

        {/* Right: Cloud Sync Badge & Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Supabase Status Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <Cloud className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Supabase / Spring Boot</span>
            <span className="text-emerald-700 font-semibold">Active</span>
          </div>

          <div className="h-6 w-px bg-slate-200"></div>

          {/* User profile badge */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
              DF
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-slate-800">Dairy Farmer</div>
              <div className="text-[11px] text-slate-400">Admin Farm Manager</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
