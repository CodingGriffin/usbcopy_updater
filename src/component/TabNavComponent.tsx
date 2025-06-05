import React from 'react';
import { Users, MapPin, ShoppingCart, Truck } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const TabNav = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/');
  const jobNumber = path[2]; // Get job number from URL path

  const getActiveTab = () => {
    switch (path[path.length - 1]) {
      case 'contacts':
        return 'contacts';
      case 'addresses':
        return 'addresses';
      case 'shipments':
        return 'shipments';
      default:
        return 'orders';
    }
  };

  const activeTab = getActiveTab();

  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <nav className="flex -mb-px">
        <button
          onClick={() => navigate('/orders')}
          className={`${
            activeTab === 'orders'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
          } flex items-center px-6 py-4 border-b-2 font-medium text-sm`}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Orders
        </button>
        <button
          onClick={() => navigate('/contacts')}
          className={`${
            activeTab === 'contacts'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
          } flex items-center px-6 py-4 border-b-2 font-medium text-sm`}
        >
          <Users className="w-5 h-5 mr-2" />
          Contacts
        </button>
        <button
          onClick={() => navigate('/addresses')}
          className={`${
            activeTab === 'addresses'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
          } flex items-center px-6 py-4 border-b-2 font-medium text-sm`}
        >
          <MapPin className="w-5 h-5 mr-2" />
          Addresses
        </button>
        {/* {location.pathname.includes('/orders/') && (
          <button
            onClick={() => navigate(`/orders/${jobNumber}/shipments`)}
            className={`${
              activeTab === 'shipments'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
            } flex items-center px-6 py-4 border-b-2 font-medium text-sm`}
          >
            <Truck className="w-5 h-5 mr-2" />
            Shipments
          </button>
        )} */}
      </nav>
    </div>
  );
});

export default TabNav;
