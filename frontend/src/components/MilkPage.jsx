import React, { useState, useEffect } from 'react';
import { DairyApi } from '../services/api';
import { Plus, Milk, Sun, Moon, Calendar, Trash2 } from 'lucide-react';

export default function MilkPage() {
  const [records, setRecords] = useState([]);
  const [cows, setCows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    cowId: '',
    shift: 'MORNING',
    quantityLiters: 8.5,
    fatPercentage: 4.5,
    snfPercentage: 8.5,
    notes: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cowsData, milkData] = await Promise.all([
        DairyApi.getCows(),
        DairyApi.getMilkRecords(),
      ]);
      setCows(cowsData);
      setRecords(milkData);
      if (cowsData.length > 0 && !formData.cowId) {
        setFormData(prev => ({ ...prev, cowId: cowsData[0].id }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cowId) {
      alert('Please select a cow.');
      return;
    }
    try {
      await DairyApi.createMilkRecord({
        cow: { id: parseInt(formData.cowId) },
        shift: formData.shift,
        quantityLiters: parseFloat(formData.quantityLiters),
        fatPercentage: parseFloat(formData.fatPercentage),
        snfPercentage: parseFloat(formData.snfPercentage),
        notes: formData.notes,
      });
      // reset note and reload
      setFormData(prev => ({ ...prev, notes: '' }));
      loadData();
    } catch (err) {
      alert('Error recording milk: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this milk production entry?')) {
      try {
        await DairyApi.deleteMilkRecord(id);
        loadData();
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  const totalYield = records.reduce((acc, curr) => acc + (curr.quantityLiters || 0), 0);
  const avgFat = records.length > 0
    ? (records.reduce((acc, curr) => acc + (curr.fatPercentage || 0), 0) / records.length).toFixed(2)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">Milk Production Tracking</h2>
        <p className="text-xs sm:text-sm text-slate-500">Record daily morning and evening yield, fat content, and trends</p>
      </div>

      {/* Overview Stat Ribbons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Total Recorded Yield</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalYield.toFixed(1)} L</div>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <Milk className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Average Fat %</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{avgFat}%</div>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Sun className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Total Entries</div>
            <div className="text-2xl font-black text-slate-900 mt-1">{records.length}</div>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Calendar className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Entry Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm h-fit">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-600" /> Log Daily Milk Entry
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Cattle *</label>
              <select
                value={formData.cowId}
                onChange={(e) => setFormData({ ...formData, cowId: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {cows.map(cow => (
                  <option key={cow.id} value={cow.id}>
                    {cow.tagNumber} - {cow.name || 'No Name'} ({cow.breed})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Milking Shift</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, shift: 'MORNING' })}
                  className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition ${
                    formData.shift === 'MORNING' 
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" /> Morning
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, shift: 'EVENING' })}
                  className={`py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition ${
                    formData.shift === 'EVENING' 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" /> Evening
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Milk Quantity (Liters) *</label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.quantityLiters}
                onChange={(e) => setFormData({ ...formData, quantityLiters: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Fat %</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.fatPercentage}
                  onChange={(e) => setFormData({ ...formData, fatPercentage: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">SNF %</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.snfPercentage}
                  onChange={(e) => setFormData({ ...formData, snfPercentage: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Notes</label>
              <input
                type="text"
                placeholder="Optional notes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 transition"
            >
              Save Milk Record
            </button>
          </form>
        </div>

        {/* Milk Production Logs Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Recent Milking History</h3>
            <span className="text-xs text-slate-400">Live Database Sync</span>
          </div>
          <div className="overflow-x-auto max-h-[520px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                <tr>
                  <th className="px-5 py-3">Date & Shift</th>
                  <th className="px-5 py-3">Cattle</th>
                  <th className="px-5 py-3">Yield (L)</th>
                  <th className="px-5 py-3">Fat / SNF</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-slate-400">No milk records logged yet.</td>
                  </tr>
                ) : (
                  records.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-slate-900">{r.recordDate}</div>
                        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md mt-0.5 ${
                          r.shift === 'MORNING' ? 'bg-amber-50 text-amber-700' : 'bg-indigo-50 text-indigo-700'
                        }`}>
                          {r.shift === 'MORNING' ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
                          {r.shift}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-slate-800">{r.cow?.tagNumber || 'N/A'}</div>
                        <div className="text-xs text-slate-400">{r.cow?.name || ''}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="font-black text-emerald-700 text-base">{r.quantityLiters} L</span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-600">
                        <div>Fat: <span className="font-bold text-slate-800">{r.fatPercentage || '--'}%</span></div>
                        <div>SNF: <span className="font-bold text-slate-800">{r.snfPercentage || '--'}%</span></div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
