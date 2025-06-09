import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Order } from '../../types';
import dayjs from 'dayjs';

interface OrdersListProps {
  orders: Order[];
  setSelectedOrder: (id: string) => void;
}

function OrdersList({orders, setSelectedOrder}: OrdersListProps) {
  // Filter orders with vendorPo: true initially
  const [filteredOrders, setFilteredOrders] = React.useState(
    orders.filter((order: any) => order.vendorPo === true)
  );
  const currentDate = new Date("yyyy-mm-dd");

  useEffect(() => {
    // Update filtered orders whenever orders prop changes
    setFilteredOrders(
      orders.filter((order: any) => {
        // First filter for vendorPo
        if (order.vendorPo !== true) return false;
        
        // Then check if any version has pad_id of 5
        if (!order.versions || !Array.isArray(order.versions)) return false;
        
        // Return true if at least one version has pad_id of 5
        return order.versions.some((version: any) => version.pad_id === 5);
      })
    );
  }, [orders]);
  
  const handleSearch = (filterValue: string) => {
    setFilteredOrders(
      orders
        .filter((order: any) => order.vendorPo === true) // First filter for vendorPo
        .filter((order: any) => order.jobNumber.toLowerCase().includes(filterValue.toLowerCase())) // Then filter by search term
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Orders</h2>
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Filter by order number..."
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="overflow-hidden bg-white dark:bg-gray-800 shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Order Number
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Status
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Last Updated Date
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">View</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order: any) => (
                <tr
                  key={order.jobNumber}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => setSelectedOrder(order.jobNumber)}
                >
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                    {order.jobNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      order.usbcopy_updates.length > 0
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        // : order.job_status === 'on-hold'
                        // ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                    }`}>
                      {order.usbcopy_updates.length > 0 ? 'Updated' : 'No Updated'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {order.usbcopy_updates.length > 0 ? dayjs(order.usbcopy_updates[order.usbcopy_updates.length - 1]?.timestamp).format('MM/DD/YYYY') : ''}
                    </div>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                      View<span className="sr-only">, {order.jobNumber}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default OrdersList;
