import React, { useState, useEffect } from 'react';

import OrdersList from '../container/Vendor/Orders'
import Header from '../component/HeaderComponent';
import { Outlet } from 'react-router-dom';

import { HubType } from '../types';
import { useSelector } from 'react-redux';

function HubPage() {
  const [hubType, setHubType] = useState<HubType>('vendor');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const {
    order,
    loading,
    error,
  } = useSelector((state: any) => state.orders);

  // Get entity_name from order
  const entityName = order?.data?.entities?.[0]?.entity_name || '';

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header 
        hubType={hubType} 
        isDarkMode={isDarkMode} 
        setHubType={setHubType} 
        toggleDarkMode={toggleDarkMode}
        entityName={entityName}
      />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default HubPage;
