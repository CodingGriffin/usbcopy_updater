import React from 'react';
import dayjs from 'dayjs';

interface UpdatesTableProps {
  updates: any[];
  section: string | null;
}

function UpdatesTable({ updates, section }: UpdatesTableProps) {
  // Filter updates where os_type matches section
  const filteredUpdates = section 
    ? updates.filter(update => update.os_type === section)
    : updates;

  if (!filteredUpdates || filteredUpdates.length === 0) {
    return <div className="p-4 text-gray-500">No updates available for this section</div>;
  }
  const host = import.meta.env.VITE_SERVER_BASE_URL;
  const liveHost = `${window.location.protocol}//${window.location.host}/`;

  const getFileName = (filePath: string) => {
    return filePath.split('/').pop() || filePath;
  };

  return (
    <div className="overflow-hidden bg-white dark:bg-gray-800 shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              File
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Status
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredUpdates.map((update, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                <a 
                  href={`${host}${update.files?.file_path}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  {getFileName(update.files?.file_path)}
                </a>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                  {update.status || 'Updated'}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                {dayjs(update.timestamp).format('MM/DD/YYYY HH:mm')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UpdatesTable;
