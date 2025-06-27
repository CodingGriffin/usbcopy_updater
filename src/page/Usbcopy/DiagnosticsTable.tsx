import React, { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { Modal } from 'antd';
import { Upload, Trash2 } from 'lucide-react';
import UploadModal from './UploadModal';

interface DiagnosticsTableProps {
  diagnostics: any[];
  section: string | null;
  versionNum: Number;
}

function DiagnosticsTable({ diagnostics, section, versionNum }: DiagnosticsTableProps) {
  // Filter diagnostics where os_type matches section
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<any | null>(null);
  const url = new URL(window.location.href);
    
    // Use URLSearchParams to get the parameter value
  console.log(url.searchParams.get('os_type'));
  console.log(url.searchParams.get('ver_num'));
  const filteredUpdates = section 
    ? diagnostics?.filter(diagnostic => diagnostic.os_type === section)
    : diagnostics;

  const handleCloseWUploadModal = useCallback(() => {
    setShowUploadModal(false);
  }, []);

  const handleRowClick = (diagnostic: any) => {
    setSelectedDiagnostic(diagnostic);
  };

  const handleCloseDiagnosticModal = () => {
    setSelectedDiagnostic(null);
  };

  if (!filteredUpdates || filteredUpdates.length === 0) {
    return (
      <>

        <div className="flex p-4 text-gray-500">
          No diagnostics available for this section
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
    <div className="overflow-hidden bg-white dark:bg-gray-800 shadow ring-1 ring-black ring-opacity-5 rounded-lg mt-4">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
        <thead>
          <tr>
            <th scope="col-2" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Name
            </th>
            <th scope="col-2" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Email
            </th>
            <th scope="col-5" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Phone Number
            </th>
            <th scope="col-5" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Drive Source
            </th>
            {/* <th scope="col-5" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Topic
            </th> */}
            <th scope="col-5" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Description
            </th>
            <th scope="col-5" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
              Posted Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredUpdates.map((diagnostic, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => handleRowClick(diagnostic)}
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                {diagnostic.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {diagnostic.email}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {diagnostic.phone_num}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {diagnostic.drive_source}
              </td>
              {/* <td className="whitespace-nowrap px-3 py-4 text-sm">
                {diagnostic.issue_option}
              </td> */}
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                {diagnostic.issue_description}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                {diagnostic.formatted_timestamp}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showUploadModal && <UploadModal _closeUploadModal={handleCloseWUploadModal} />}

      {/* Diagnostic Details Modal */}
      {selectedDiagnostic && (
        <Modal
          open={!!selectedDiagnostic}
          onCancel={handleCloseDiagnosticModal}
          footer={null}
          title="Diagnostic Details"
        >
          <div className="space-y-2">
            <div><strong>Name :</strong> {selectedDiagnostic.name}</div>
            <div><strong>Email :</strong> {selectedDiagnostic.email}</div>
            <div><strong>Phone Number :</strong> {selectedDiagnostic.phone_num}</div>
            <div><strong>Drive Source :</strong> {selectedDiagnostic.drive_source}</div>
            <div><strong>OS :</strong> {selectedDiagnostic.os_type}</div>
            <div><strong>Browser Info :</strong> {selectedDiagnostic.browser_info}</div>
            <div><strong>VID :</strong> {selectedDiagnostic.vid}</div>
            <div><strong>PID :</strong> {selectedDiagnostic.pid}</div>
            <div><strong>Support Code :</strong> {selectedDiagnostic.serial_number}</div>
            {selectedDiagnostic.issue_option && (
              <div><strong>Topic :</strong> {selectedDiagnostic.issue_option}</div>
            )}
            <div><strong>Description :</strong> {selectedDiagnostic.issue_description}</div>
            <div><strong>Posted Date :</strong> {selectedDiagnostic.formatted_timestamp}</div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default DiagnosticsTable;
