import React, { useState } from 'react';
import { LMSProvider } from './contexts/LMSContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Roadmap from './components/Roadmap';
import Progress from './components/Progress';
import Profile from './components/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'roadmap':
        return <Roadmap />;
      case 'progress':
        return <Progress />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LMSProvider>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </LMSProvider>
  );
}

export default App;