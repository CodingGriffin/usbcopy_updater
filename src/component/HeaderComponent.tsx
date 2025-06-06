import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Building2, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = React.memo(({isDarkMode, toggleDarkMode}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const isVendorRoute = pathParts[1] === 'vendor';
  const isOrdersList = pathParts[2] === 'orders';

  // console.log("HeaderComponent");
  
  const dispatch = useDispatch();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src="https://imagedelivery.net/MKEvMIcAFUaEDbHj7BP86Q/5b404e84-91b7-4e07-269e-0816162e4300/public" 
              alt="Well Assembled Meetings Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                USBCopyPro
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
});

export default Header;
