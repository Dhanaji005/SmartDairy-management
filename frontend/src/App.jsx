import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CowsPage from './components/CowsPage';
import MilkPage from './components/MilkPage';
import HealthPage from './components/HealthPage';
import FinancePage from './components/FinancePage';
import AiAdvisorPage from './components/AiAdvisorPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          activeTab={activeTab} 
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'cows' && <CowsPage />}
          {activeTab === 'milk' && <MilkPage />}
          {activeTab === 'health' && <HealthPage />}
          {activeTab === 'finance' && <FinancePage />}
          {activeTab === 'advisor' && <AiAdvisorPage />}
        </main>
      </div>
    </div>
  );
}
