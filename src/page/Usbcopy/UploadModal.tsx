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
