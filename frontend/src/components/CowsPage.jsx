import React, { useState, useEffect } from 'react';
import { DairyApi } from '../services/api';
import { Plus, Search, Trash2, Edit2, ShieldAlert, CheckCircle2, X } from 'lucide-react';

export default function CowsPage() {
  const [cows, setCows] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form state for adding new cow
  const [formData, setFormData] = useState({
    tagNumber: '',
    name: '',
    breed: 'Gir',
    gender: 'Female',
    lactationStage: 'Early',
    healthStatus: 'Healthy',
    weightKg: 400,
    notes: '',
  });

  useEffect(() => {
    loadCows();
  }, []);

  const loadCows = async () => {
    try {
      setLoading(true);
      const data = await DairyApi.getCows();
      setCows(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCow = async (e) => {
    e.preventDefault();
    try {
      await DairyApi.createCow(formData);
      setIsModalOpen(false);
      setFormData({
        tagNumber: '',
        name: '',
        breed: 'Gir',
        gender: 'Female',
        lactationStage: 'Early',
        healthStatus: 'Healthy',
        weightKg: 400,
        notes: '',
      });
      loadCows();
    } catch (err) {
      alert('Error registering cow: ' + err.message);
    }
  };

  const handleDeleteCow = async (id) => {
    if (window.confirm('Are you sure you want to delete this cattle record?')) {
      try {
        await DairyApi.deleteCow(id);
        loadCows();
      } catch (err) {
        alert('Error deleting cow: ' + err.message);
      }
    }
  };

  const filteredCows = cows.filter(c => 
    c.tagNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.breed?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">Cow Management</h2>
          <p className="text-xs sm:text-sm text-slate-500">Track cattle details, breeds, lactation stages, and health status</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Register New Cow
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
        <Search className="w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by Tag Number (e.g. TAG-101), Name, or Breed..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-sm outline-none text-slate-800 placeholder-slate-400"
        />
      </div>

      {/* Cattle Table / Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/75 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Tag ID & Name</th>
                <th className="px-6 py-3.5">Breed</th>
                <th className="px-6 py-3.5">Lactation Stage</th>
                <th className="px-6 py-3.5">Health Status</th>
                <th className="px-6 py-3.5">Weight (Kg)</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-400">Loading herd data...</td>
                </tr>
              ) : filteredCows.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-slate-400">No cows found. Add one above!</td>
                </tr>
              ) : (
                filteredCows.map((cow) => (
                  <tr key={cow.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-lg shadow-sm border border-slate-200">
                          🐄
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{cow.tagNumber}</div>
                          <div className="text-xs text-slate-500">{cow.name || 'Unnamed'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{cow.breed}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                        {cow.lactationStage}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        cow.healthStatus === 'Healthy'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {cow.healthStatus === 'Healthy' ? <CheckCircle2 className="w-3 h-3" /> : <ShieldAlert className="w-3 h-3" />}
                        {cow.healthStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">{cow.weightKg || '--'} kg</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteCow(cow.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Delete Cattle"
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

      {/* Add Cow Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Register New Cattle</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCow} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tag Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TAG-106"
                    value={formData.tagNumber}
                    onChange={(e) => setFormData({ ...formData, tagNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Radha"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Breed</label>
                  <select
                    value={formData.breed}
                    onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Gir">Gir</option>
                    <option value="Sahiwal">Sahiwal</option>
                    <option value="Red Sindhi">Red Sindhi</option>
                    <option value="Holstein Friesian">Holstein Friesian</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Murrah Buffalo">Murrah Buffalo</option>
                    <option value="Crossbred">Crossbred</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Lactation Stage</label>
                  <select
                    value={formData.lactationStage}
                    onChange={(e) => setFormData({ ...formData, lactationStage: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Early">Early Lactation</option>
                    <option value="Mid">Mid Lactation</option>
                    <option value="Late">Late Lactation</option>
                    <option value="Dry">Dry Period</option>
                    <option value="Pregnant">Pregnant</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Health Status</label>
                  <select
                    value={formData.healthStatus}
                    onChange={(e) => setFormData({ ...formData, healthStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Healthy">Healthy</option>
                    <option value="Under Observation">Under Observation</option>
                    <option value="In Treatment">In Treatment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Weight (Kg)</label>
                  <input
                    type="number"
                    value={formData.weightKg}
                    onChange={(e) => setFormData({ ...formData, weightKg: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Notes</label>
                <textarea
                  rows="2"
                  placeholder="Special diet, history, pedigree notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow transition"
                >
                  Save Cattle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
