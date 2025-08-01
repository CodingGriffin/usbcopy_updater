import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { UppyUploader } from '../../component/UppyUploader';
import useUppy from '../../utils/useUppy';

interface UploadModalProps {
  _closeUploadModal: () => void;
}

const UploadModal = React.memo(({ _closeUploadModal }: UploadModalProps) => {

  const { uppy } = useUppy();

  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setFileName = (name: String) => {
    console.log('file name ========================> ', name)
    const url = new URL(window.location.href);
    url.searchParams.set('file_name', String(name));
    window.history.pushState({}, '', url);
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
              Upload Files
            </h2>
            <button
              onClick={_closeUploadModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Enhanced Form Section */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* File Name Input */}
                <label className=" font-semibold text-gray-800 dark:text-gray-200 ml-3 transition-colors duration-200">
                  File Name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    required
                    type="text"
                    name="fileName"
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="Enter file name..."
                    className="w-full px-4 py-3 text-sm bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-sm transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:outline-none hover:border-gray-300 dark:hover:border-gray-500 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none"></div>
                </div>
            </div>

            {/* Decorative separator */}
            <div className="mt-8 mb-6 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
              <div className="px-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            </div>
          </div>
          <UppyUploader uppy={uppy} />

          {/* Action Buttons */}
          {/* <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={_closeUploadModal}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg dark:bg-gray-100 hover:dark:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                _closeUploadModal;
                // setSelectedFiles([]);
              }}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 "
              disabled={selectedFiles.length === 0}
            >
              Upload {selectedFiles.length > 0 && `(${selectedFiles.length})`}
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
});

export default UploadModal;
