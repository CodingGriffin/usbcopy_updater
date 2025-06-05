import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Building2, Sun, Moon } from 'lucide-react';

import actions from "../states/Contacts/actions";
import { HubType } from '../types';

interface HeaderProps {
  isDarkMode: boolean;
  hubType: HubType;
  toggleDarkMode: () => void;
  setHubType: (status: HubType) => void;
  entityName?: string;
}

const Header = React.memo(({hubType, isDarkMode, toggleDarkMode, setHubType, entityName}: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const isVendorRoute = pathParts[1] === 'vendor';
  const isOrdersList = pathParts[2] === 'orders';

  const {
    session,
    loading,
    error,
  } = useSelector((state: any) => state.contacts);

  if (isVendorRoute) hubType = 'customer';
  if (isVendorRoute && isOrdersList && (pathParts[3] == '' || !pathParts[3])) entityName = '';
  // console.log("HeaderComponent");
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    getSession();
  }, []);

  const getSession = () => {
    dispatch({
      type: actions.GET_SESSION,
      payload: {
        mode: "getSession"
      }
    });
  }

  console.log("session ====================================> ", session);

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
              {hubType === 'vendor' ? 'Customer Hub - Well Assembled Meetings' : (
                <>
                  Vendor Hub
                  {entityName && ' - ' + entityName}
                </>
              )}
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
            {session.data?.entities_id == 1 &&
            <button
              onClick={async () => {await setHubType(hubType === 'customer' ? 'vendor' : 'customer'); navigate(`/${hubType}`);}}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Switch to {hubType === 'vendor' ? 'Vendor' : 'Customer'} Hub
            </button>
            }
          </div>
        </div>
      </div>
    </header>
  )
});

export default Header;
