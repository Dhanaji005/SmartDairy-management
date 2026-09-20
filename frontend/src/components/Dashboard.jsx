import React, { useEffect, useState } from 'react';
import { DairyApi } from '../services/api';
import { 
  Layers, 
  Milk, 
  HeartPulse, 
  TrendingUp, 
  AlertTriangle, 
  PlusCircle, 
  ArrowUpRight,
  Bot,
  Calendar
} from 'lucide-react';

export default function Dashboard({ setActiveTab }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await DairyApi.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const trend = stats?.last7DaysMilkTrend || [];
  const maxLiters = Math.max(...trend.map(t => t.liters), 50);

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            Dairy Operations Overview
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome to Smart Dairy Farm 🌿
          </h2>
          <p className="mt-2 text-emerald-100 text-sm leading-relaxed">
            Monitor herd health, daily morning/evening milk production, feed stock, and farm profitability in real time.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('milk')}
              className="px-4 py-2 bg-white text-emerald-800 rounded-xl text-xs font-bold hover:bg-emerald-50 transition shadow flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" /> Record Today's Milk
            </button>
            <button
              onClick={() => setActiveTab('advisor')}
              className="px-4 py-2 bg-emerald-900/60 backdrop-blur-sm border border-emerald-500/40 text-white rounded-xl text-xs font-bold hover:bg-emerald-900/80 transition flex items-center gap-1.5"
            >
              <Bot className="w-4 h-4 text-emerald-300" /> Consult AI Advisor
            </button>
          </div>
        </div>
        <div className="absolute right-4 bottom-0 opacity-20 text-[120px] select-none pointer-events-none hidden sm:block">
          🐄
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Cows */}
        <div 
          onClick={() => setActiveTab('cows')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Herd</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">{stats?.totalCows ?? 0}</div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 font-medium">
              <span className="text-emerald-600 font-semibold">{stats?.healthyCows ?? 0} Healthy</span> • 
              <span className="text-amber-600 font-semibold">{stats?.sickOrObservationCows ?? 0} Observation</span>
            </div>
          </div>
        </div>

        {/* Card 2: Today's Milk */}
        <div 
          onClick={() => setActiveTab('milk')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Milk</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition">
              <Milk className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900 flex items-baseline gap-1">
              {stats?.todayMilkLiters ?? 0}
              <span className="text-base font-semibold text-slate-500">Liters</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> High yield tracking active
            </div>
          </div>
        </div>

        {/* Card 3: Pending Vaccinations */}
        <div 
          onClick={() => setActiveTab('health')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Vaccine Alerts</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition">
              <HeartPulse className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">{stats?.pendingVaccinationsCount ?? 0}</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-amber-700 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" /> Due within 14 days
            </div>
          </div>
        </div>

        {/* Card 4: Net Monthly Profit */}
        <div 
          onClick={() => setActiveTab('finance')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Month Net Profit</span>
            <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600 group-hover:scale-110 transition">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-extrabold text-slate-900">
              ₹{(stats?.netProfit ?? 0).toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
              <span className="text-emerald-600 font-semibold">₹{(stats?.currentMonthIncome ?? 0).toLocaleString()} In</span> • 
              <span className="text-rose-600 font-semibold">₹{(stats?.currentMonthExpense ?? 0).toLocaleString()} Out</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: 7-Day Production Chart + Recent Health Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Day Milk Production Visual Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">7-Day Milk Production Trend</h3>
              <p className="text-xs text-slate-500">Daily yield across morning and evening milking shifts</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
              Litres (L)
            </span>
          </div>

          {/* Bar Chart Visualizer */}
          <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 pt-6 px-2">
            {trend.map((day, idx) => {
              const heightPercent = Math.min(Math.round((day.liters / maxLiters) * 100), 100);
              const isToday = idx === trend.length - 1;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[11px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition">
                    {day.liters}L
                  </div>
                  <div className="w-full max-w-[48px] bg-slate-100 rounded-t-lg relative flex items-end h-full overflow-hidden">
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isToday 
                          ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-md shadow-emerald-500/20' 
                          : 'bg-emerald-500 hover:bg-emerald-600'
                      }`}
                    />
                  </div>
                  <span className={`text-xs font-medium truncate max-w-[50px] ${
                    isToday ? 'text-emerald-700 font-bold' : 'text-slate-500'
                  }`}>
                    {day.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Health & Reminders Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" /> Upcoming Alerts
            </h3>
            <button
              onClick={() => setActiveTab('health')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
            >
              View all
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto max-h-64">
            {stats?.recentAlerts?.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                🎉 All vaccinations and checkups are up to date!
              </div>
            ) : (
              stats?.recentAlerts?.map((alert) => (
                <div 
                  key={alert.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition flex items-start gap-3"
                >
                  <div className={`p-2 rounded-lg ${alert.isOverdue ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">{alert.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Cow: <span className="font-semibold text-slate-700">{alert.cowTag} ({alert.cowName})</span>
                    </div>
                    <div className={`text-[10px] font-bold mt-1 ${alert.isOverdue ? 'text-rose-600' : 'text-amber-700'}`}>
                      Due: {alert.dueDate}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
