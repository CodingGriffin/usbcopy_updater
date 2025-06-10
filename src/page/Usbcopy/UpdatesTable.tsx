import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { Modal } from 'antd';
import { Upload, Trash2 } from 'lucide-react';
import UploadModal from './UploadModal';

interface UpdatesTableProps {
  updates: any[];
  section: string | null;
  versionNum: Number;
  deleteUpdate: (id: any) => void;
}

function UpdatesTable({ updates, section, versionNum, deleteUpdate }: UpdatesTableProps) {
  // Filter updates where os_type matches section
  const [showUploadModal, setShowUploadModal] = useState(false);
  const url = new URL(window.location.href);
    
    // Use URLSearchParams to get the parameter value
  console.log(url.searchParams.get('os_type'));
  console.log(url.searchParams.get('ver_num'));
  const filteredUpdates = section 
    ? updates?.filter(update => update.os_type === section)
    : updates;

  const host = import.meta.env.VITE_SERVER_BASE_URL;
  const liveHost = `${window.location.protocol}//${window.location.host}/`;

  const getFileName = (filePath: string) => {
    return filePath.split('/').pop() || filePath;
  };
  
  const handleCloseWUploadModal = useCallback(() => {
    setShowUploadModal(false);
  }, []);

  const handleDeleteUpdate = (id: any, name: string) => {
    Modal.confirm({
      title: 'Delete Photo Sample',
      content: `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      okText: 'Yes, Delete',
      cancelText: 'No, Cancel',
      okButtonProps: {
        className: 'bg-red-600 hover:bg-red-700',
      },
      onOk() {
        deleteUpdate(id);
      },
      onCancel() {
        console.log('Delete cancelled');
      }
    });
  };

  if (!filteredUpdates || filteredUpdates.length === 0) {
    return (
      <>

        <div className="flex p-4 text-gray-500">
          No updates available for this section
          <button 
            onClick={() => setShowUploadModal(true)}
            className="flex items-center ms-5 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <Upload className="w-4 h-4 mr-1.5" />
            <span>Upload</span>
          </button>
        </div>
        {showUploadModal && <UploadModal _closeUploadModal={handleCloseWUploadModal} />}
      </>
    )
  }

  return (
    <div className="overflow-hidden bg-white dark:bg-gray-800 shadow ring-1 ring-black ring-opacity-5 rounded-lg">

      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead>
          <tr>
            <th scope="col-2" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              File
            </th>
            <th scope="col-2" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Status
            </th>
            <th scope="col-5" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Last Updated
            </th>
            <th scope="col-5" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Action
            </th>
            <th scope="col-1" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              <button 
                onClick={() => setShowUploadModal(true)}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Upload className="w-4 h-4 mr-1.5" />
                <span>Upload</span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredUpdates.map((update, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                <a 
                  href={`${update.file_url}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  {getFileName(update.file_url)}
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
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <button
                  onClick={() => handleDeleteUpdate(update.id, getFileName(update.file_url))}
                  className=" px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all duration-200 flex items-center gap-1"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showUploadModal && <UploadModal _closeUploadModal={handleCloseWUploadModal} />}
    </div>
  );
}

export default UpdatesTable;
