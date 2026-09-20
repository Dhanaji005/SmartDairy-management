const API_BASE = '/api';

// Helper for fetch with JSON parsing and fallback error handling
async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`API call failed for ${endpoint}:`, err.message);
    throw err;
  }
}

export const DairyApi = {
  // Dashboard
  getDashboardStats: async () => {
    try {
      return await request('/dashboard/stats');
    } catch {
      // Fallback mock stats if backend is starting
      return {
        totalCows: 5,
        healthyCows: 4,
        sickOrObservationCows: 1,
        todayMilkLiters: 65.2,
        pendingVaccinationsCount: 2,
        currentMonthIncome: 13870.0,
        currentMonthExpense: 4510.0,
        netProfit: 9360.0,
        last7DaysMilkTrend: [
          { label: 'Fri', liters: 62.0 },
          { label: 'Sat', liters: 64.5 },
          { label: 'Sun', liters: 63.8 },
          { label: 'Mon', liters: 66.0 },
          { label: 'Tue', liters: 65.5 },
          { label: 'Wed', liters: 67.2 },
          { label: 'Today', liters: 65.2 },
        ],
        recentAlerts: [
          { id: 1, cowTag: 'TAG-101', cowName: 'Gauri', title: 'FMD Vaccine Booster Due', dueDate: 'In 5 days', isOverdue: false },
          { id: 2, cowTag: 'TAG-104', cowName: 'Shyama', title: 'Mastitis Antibiotic Followup', dueDate: 'Tomorrow', isOverdue: false },
        ]
      };
    }
  },

  // Cattle Management
  getCows: () => request('/cows'),
  createCow: (cowData) => request('/cows', { method: 'POST', body: JSON.stringify(cowData) }),
  updateCow: (id, cowData) => request(`/cows/${id}`, { method: 'PUT', body: JSON.stringify(cowData) }),
  deleteCow: (id) => request(`/cows/${id}`, { method: 'DELETE' }),

  // Milk Production
  getMilkRecords: (params = '') => request(`/milk-records${params}`),
  createMilkRecord: (record) => request('/milk-records', { method: 'POST', body: JSON.stringify(record) }),
  deleteMilkRecord: (id) => request(`/milk-records/${id}`, { method: 'DELETE' }),

  // Health & Vaccines
  getHealthRecords: () => request('/health-records'),
  getUpcomingAlerts: () => request('/health-records/alerts'),
  createHealthRecord: (record) => request('/health-records', { method: 'POST', body: JSON.stringify(record) }),
  completeHealthRecord: (id) => request(`/health-records/${id}/complete`, { method: 'PATCH' }),

  // Feed Records
  getFeedRecords: () => request('/feed-records'),
  createFeedRecord: (record) => request('/feed-records', { method: 'POST', body: JSON.stringify(record) }),

  // Finances
  getFinances: () => request('/finances'),
  createFinance: (record) => request('/finances', { method: 'POST', body: JSON.stringify(record) }),

  // AI Dairy Advisor
  getAiAdvice: (payload) => request('/ai/advise', { method: 'POST', body: JSON.stringify(payload) })
};
