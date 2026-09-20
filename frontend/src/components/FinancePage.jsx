import React, { useState, useEffect } from 'react';
import { DairyApi } from '../services/api';
import { DollarSign, Plus, ArrowDownRight, ArrowUpRight, TrendingUp, Calendar, Trash2 } from 'lucide-react';

export default function FinancePage() {
  const [finances, setFinances] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    type: 'INCOME',
    category: 'MILK_SALE',
    amount: 4500,
    description: 'Milk collection cooperative payout',
  });

  useEffect(() => {
    loadFinances();
  }, []);

  const loadFinances = async () => {
    try {
      setLoading(true);
      const data = await DairyApi.getFinances();
      setFinances(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await DairyApi.createFinance({
        type: formData.type,
        category: formData.category,
        amount: parseFloat(formData.amount),
        description: formData.description,
      });
      setFormData({
        type: 'INCOME',
        category: 'MILK_SALE',
        amount: 0,
        description: '',
      });
      loadFinances();
    } catch (err) {
      alert('Error creating record: ' + err.message);
    }
  };

  const totalIncome = finances
    .filter(f => f.type === 'INCOME')
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const totalExpense = finances
    .filter(f => f.type === 'EXPENSE')
    .reduce((acc, curr) => acc + (curr.amount || 0), 0);

  const netBalance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">Financial Records & Accounts</h2>
        <p className="text-xs sm:text-sm text-slate-500">Track dairy milk sales, feed purchases, veterinary bills, and net farm profit</p>
      </div>

      {/* 3 Finance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            Total Revenue
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2">
            ₹{totalIncome.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">Milk & cattle sales</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            Total Expenses
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 mt-2">
            ₹{totalExpense.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">Feed, medicine & labour</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
            Net Profit / Balance
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl sm:text-3xl font-black mt-2 ${netBalance >= 0 ? 'text-slate-900' : 'text-rose-600'}`}>
            ₹{netBalance.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-1">Net farm margin</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Entry Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm h-fit">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-600" /> Record Transaction
          </h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Transaction Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'INCOME', category: 'MILK_SALE' })}
                  className={`py-2 rounded-xl text-xs font-bold transition border ${
                    formData.type === 'INCOME' 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow' 
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  + Income (Sale)
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'EXPENSE', category: 'FEED' })}
                  className={`py-2 rounded-xl text-xs font-bold transition border ${
                    formData.type === 'EXPENSE' 
                      ? 'bg-rose-600 text-white border-rose-600 shadow' 
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  - Expense (Cost)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {formData.type === 'INCOME' ? (
                  <>
                    <option value="MILK_SALE">Milk Sale</option>
                    <option value="CATTLE_SALE">Cattle Sale</option>
                    <option value="MANURE_SALE">Manure / Bio-gas Sale</option>
                    <option value="OTHER">Other Income</option>
                  </>
                ) : (
                  <>
                    <option value="FEED">Fodder & Concentrate Feed</option>
                    <option value="VET_MEDICINE">Veterinary Doctor & Medicines</option>
                    <option value="LABOUR">Farm Helper Wages</option>
                    <option value="EQUIPMENT">Equipment / Maintenance</option>
                    <option value="OTHER">Other Farm Expense</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Amount (₹) *</label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description / Notes</label>
              <input
                type="text"
                placeholder="e.g. 50L milk sent to dairy coop"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition"
            >
              Add Transaction
            </button>
          </form>
        </div>

        {/* Ledger Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 font-bold text-slate-900 text-sm">
            Recent Transactions Ledger
          </div>
          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
                <tr>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {finances.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-slate-400">No finance entries recorded.</td>
                  </tr>
                ) : (
                  finances.map((f) => (
                    <tr key={f.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-5 py-3.5 text-xs text-slate-500 font-medium">
                        {f.transactionDate}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {f.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-slate-600">
                        {f.description || '--'}
                      </td>
                      <td className={`px-5 py-3.5 text-right font-black text-sm ${
                        f.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'
                      }`}>
                        {f.type === 'INCOME' ? '+' : '-'} ₹{(f.amount || 0).toLocaleString()}
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
