import React, { useState } from 'react';
import { Users, MapPin, ShoppingCart } from 'lucide-react';

interface TabNavProps {
  activeTab: string;
  setActiveTab: (status: string) => void;
}

const Nav = React.memo(({ activeTab, setActiveTab }: TabNavProps) => {
  return (
    <nav className="flex gap-8 mb-5 text-gray-400 border-b border-gray-700 pb-4">
      <button 
        onClick={() => setActiveTab('advanced')}
        className={`flex items-center gap-2 ${activeTab === 'advanced' ? 'text-[#4d9fff]' : ''}`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
        Advanced
      </button>
      <button 
        onClick={() => setActiveTab('name-icon')}
        className={`flex items-center gap-2 ${activeTab === 'name-icon' ? 'text-[#4d9fff]' : ''}`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        Name & Icon
      </button>
      <button 
        onClick={() => setActiveTab('data-files')}
        className={`flex items-center gap-2 ${activeTab === 'data-files' ? 'text-[#4d9fff]' : ''}`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
        </svg>
        Data Files
      </button>
      <button 
        onClick={() => setActiveTab('review')}
        className={`flex items-center gap-2 ${activeTab === 'review' ? 'text-[#4d9fff]' : ''}`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        Review
      </button>
    </nav>

  );
});

export default Nav;