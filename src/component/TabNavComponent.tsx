import React, { useState } from 'react';
import { Stethoscope, Rocket } from 'lucide-react';

interface TabNavProps {
  activeTab: any;
  setActiveTab: (status: String) => void;
}

const TabNav = React.memo(({activeTab, setActiveTab}: TabNavProps) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="flex -mb-px">
        <button
          onClick={() => setActiveTab('versions')}
          className={`${
            activeTab === 'versions'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
          } flex items-center px-6 py-4 border-b-2 font-medium text-sm`}
        >
          <Rocket className="w-5 h-5 mr-2" />
          Files
        </button>
        <button
          onClick={() => setActiveTab('diagnostics')}
          className={`${
            activeTab === 'diagnostics'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
          } flex items-center px-6 py-4 border-b-2 font-medium text-sm`}
        >
          <Stethoscope className="w-5 h-5 mr-2" />
          Diagnostics
        </button>
      </nav>
    </div>
  );
});

export default TabNav;
