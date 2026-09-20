import React, { useState, useEffect } from 'react';
import { DairyApi } from '../services/api';
import { HeartPulse, Plus, CheckCircle, Clock, Trash2, X, AlertTriangle } from 'lucide-react';

export default function HealthPage() {
  const [records, setRecords] = useState([]);
  const [cows, setCows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    cowId: '',
    issueOrVaccine: '',
    administeredDate: new Date().toISOString().split('T')[0],
    nextDueDate: '',
    vetName: 'Dr. Sharma',
    cost: 250,
    status: 'SCHEDULED',
    treatmentNotes: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [cowsData, healthData] = await Promise.all([
        DairyApi.getCows(),
        DairyApi.getHealthRecords(),
      ]);
      setCows(cowsData);
      setRecords(healthData);
      if (cowsData.length > 0 && !formData.cowId) {
        setFormData(prev => ({ ...prev, cowId: cowsData[0].id }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await DairyApi.createHealthRecord({
        cow: { id: parseInt(formData.cowId) },
        issueOrVaccine: formData.issueOrVaccine,
        administeredDate: formData.administeredDate,
        nextDueDate: formData.nextDueDate || null,
        vetName: formData.vetName,
        cost: parseFloat(formData.cost) || 0,
        status: formData.status,
        treatmentNotes: formData.treatmentNotes,
      });
      setIsModalOpen(false);
      setFormData(prev => ({ ...prev, issueOrVaccine: '', treatmentNotes: '' }));
      loadData();
    } catch (err) {
      alert('Error creating record: ' + err.message);
    }
  };

  const handleMarkComplete = async (id) => {
    try {
      await DairyApi.completeHealthRecord(id);
      loadData();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Health & Vaccination Monitoring</h2>
          <p className="text-xs sm:text-sm text-slate-500">Track vaccinations, scheduled boosters, diseases, and veterinary costs</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Schedule Vaccine / Treatment
        </button>
      </div>

      {/* Health Records Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-3.5">Cattle</th>
                <th className="px-6 py-3.5">Vaccine / Health Event</th>
                <th className="px-6 py-3.5">Administered Date</th>
                <th className="px-6 py-3.5">Next Due Booster</th>
                <th className="px-6 py-3.5">Vet & Cost</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {records.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-400">No medical or vaccine records recorded yet.</td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900">{r.cow?.tagNumber || 'Unknown'}</div>
                      <div className="text-xs text-slate-500">{r.cow?.name || ''}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">{r.issueOrVaccine}</div>
                      {r.treatmentNotes && <div className="text-xs text-slate-400 truncate max-w-xs">{r.treatmentNotes}</div>}
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-600">
                      {r.administeredDate}
                    </td>
                    <td className="px-6 py-4">
                      {r.nextDueDate ? (
                        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {r.nextDueDate}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">--</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div>{r.vetName || 'N/A'}</div>
                      <div className="text-slate-400 font-medium">₹{r.cost || 0}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        r.status === 'COMPLETED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {r.status === 'COMPLETED' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {r.status !== 'COMPLETED' && (
                        <button
                          onClick={() => handleMarkComplete(r.id)}
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-lg text-xs font-bold hover:bg-emerald-100 transition"
                        >
                          Mark Done
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Add Health / Vaccination Record</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Cattle *</label>
                <select
                  value={formData.cowId}
                  onChange={(e) => setFormData({ ...formData, cowId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {cows.map(cow => (
                    <option key={cow.id} value={cow.id}>
                      {cow.tagNumber} - {cow.name || 'No Name'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Vaccine / Disease / Treatment *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FMD Vaccine, Mastitis Antibiotic, Deworming"
                  value={formData.issueOrVaccine}
                  onChange={(e) => setFormData({ ...formData, issueOrVaccine: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date Administered</label>
                  <input
                    type="date"
                    required
                    value={formData.administeredDate}
                    onChange={(e) => setFormData({ ...formData, administeredDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Next Due Booster Date</label>
                  <input
                    type="date"
                    value={formData.nextDueDate}
                    onChange={(e) => setFormData({ ...formData, nextDueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Veterinarian Name</label>
                  <input
                    type="text"
                    value={formData.vetName}
                    onChange={(e) => setFormData({ ...formData, vetName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cost (₹)</label>
                  <input
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Notes / Prescribed Medicine</label>
                <textarea
                  rows="2"
                  value={formData.treatmentNotes}
                  onChange={(e) => setFormData({ ...formData, treatmentNotes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
