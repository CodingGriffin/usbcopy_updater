import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Package, Palette, Database, Upload, FileText, CheckSquare, Camera, Search } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface VendorJob {
  id: string;
  version: number;
  section: 'packaging' | 'artwork' | 'data';
  type: 'download-files' | 'upload-sample' | 'view-sample';
  title: string;
  status?: 'pending' | 'approved' | 'rejected';
}

interface Order {
  id: string;
  orderNumber: string;
  jobs: VendorJob[];
}

const EXAMPLE_PDF_URL = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
const VERSIONS = [1];

export default function VendorOrdersTab() {
  const [orders] = useState<Order[]>([
    {
      id: '1',
      orderNumber: '12345',
      jobs: [
        // Version 1
        { id: '1', version: 1, section: 'packaging', type: 'download-files', title: 'Download Files' },
        { id: '2', version: 1, section: 'packaging', type: 'upload-sample', title: 'Upload Sample Photos', status: 'pending' },
        { id: '3', version: 1, section: 'packaging', type: 'view-sample', title: 'View Sample Status', status: 'pending' },
        { id: '4', version: 1, section: 'artwork', type: 'download-files', title: 'Download Files' },
        { id: '5', version: 1, section: 'artwork', type: 'upload-sample', title: 'Upload Sample Photos', status: 'pending' },
        { id: '6', version: 1, section: 'artwork', type: 'view-sample', title: 'View Sample Status', status: 'pending' },
        { id: '7', version: 1, section: 'data', type: 'download-files', title: 'Download Files' },
        { id: '8', version: 1, section: 'data', type: 'upload-sample', title: 'Upload Sample Photos', status: 'pending' },
        { id: '9', version: 1, section: 'data', type: 'view-sample', title: 'View Sample Status', status: 'pending' }
      ],
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [orderFilter, setOrderFilter] = useState('');

  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(orderFilter.toLowerCase())
  );

  const toggleVersion = (version: number) => {
    setExpandedVersions(prev => ({
      ...prev,
      [version]: !prev[version],
    }));
  };

  const toggleSection = (version: number, section: string) => {
    const key = `${version}-${section}`;
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'packaging':
        return <Package className="w-5 h-5" />;
      case 'artwork':
        return <Palette className="w-5 h-5" />;
      case 'data':
        return <Database className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const selectedJobData = selectedJob 
    ? orders.find(o => o.id === selectedOrder)?.jobs.find(j => j.id === selectedJob)
    : null;

  return (
    <div className="space-y-4">
      {/* Order filter */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Filter orders by number..."
          value={orderFilter}
          onChange={(e) => setOrderFilter(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div className="flex h-[calc(100vh-20rem)]">
        {/* Left sidebar */}
        <div className="w-64 border-r border-gray-200 overflow-y-auto">
          {filteredOrders.map(order => (
            <div key={order.id}>
              <button
                onClick={() => setSelectedOrder(order.id)}
                className={`w-full text-left px-4 py-2 flex items-center justify-between ${
                  selectedOrder === order.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                }`}
              >
                <span>Order #{order.orderNumber}</span>
                {selectedOrder === order.id ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>

              {selectedOrder === order.id && (
                <div className="pl-4">
                  {VERSIONS.map(version => (
                    <div key={version}>
                      <button
                        onClick={() => toggleVersion(version)}
                        className="w-full text-left px-4 py-2 flex items-center justify-between hover:bg-gray-50"
                      >
                        <span className="font-medium">Version {version}</span>
                        {expandedVersions[version] ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>

                      {expandedVersions[version] && (
                        <div className="pl-4">
                          {['packaging', 'artwork', 'data'].map(section => (
                            <div key={`${version}-${section}`}>
                              <button
                                onClick={() => toggleSection(version, section)}
                                className="w-full text-left px-4 py-2 flex items-center justify-between hover:bg-gray-50"
                              >
                                <div className="flex items-center space-x-2">
                                  {getSectionIcon(section)}
                                  <span className="capitalize">{section}</span>
                                </div>
                                {expandedSections[`${version}-${section}`] ? (
                                  <ChevronDown className="w-4 h-4" />
                                ) : (
                                  <ChevronRight className="w-4 h-4" />
                                )}
                              </button>

                              {expandedSections[`${version}-${section}`] && (
                                <div className="pl-4">
                                  {order.jobs
                                    .filter(job => job.version === version && job.section === section)
                                    .map(job => (
                                      <button
                                        key={job.id}
                                        onClick={() => setSelectedJob(job.id)}
                                        className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between ${
                                          selectedJob === job.id
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'hover:bg-gray-50'
                                        }`}
                                      >
                                        <div className="flex items-center space-x-2">
                                          {job.type === 'download-files' && <FileText className="w-4 h-4" />}
                                          {job.type === 'upload-sample' && <Camera className="w-4 h-4" />}
                                          {job.type === 'view-sample' && <CheckSquare className="w-4 h-4" />}
                                          <span>{job.title}</span>
                                        </div>
                                        {job.status && (
                                          <span className={`text-xs px-2 py-1 rounded-full ${
                                            job.status === 'approved' ? 'bg-green-100 text-green-800' :
                                            job.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                          }`}>
                                            {job.status}
                                          </span>
                                        )}
                                      </button>
                                    ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right content area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedJobData ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-medium text-gray-900">
                    {selectedJobData.title}
                  </h2>
                  <p className="text-sm text-gray-500">Version {selectedJobData.version}</p>
                </div>
              </div>

              <div className="space-y-4">
                {selectedJobData.type === 'download-files' && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <Document
                      file={EXAMPLE_PDF_URL}
                      onLoadSuccess={onDocumentLoadSuccess}
                      className="flex justify-center"
                    >
                      <Page
                        pageNumber={pageNumber}
                        className="shadow-lg bg-white"
                      />
                    </Document>
                    <div className="mt-4 flex justify-center">
                      <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        <FileText className="w-4 h-4 mr-2" />
                        Download Files
                      </button>
                    </div>
                  </div>
                )}

                {selectedJobData.type === 'upload-sample' && (
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12">
                      <div className="text-center">
                        <Camera className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                          <p className="text-sm text-gray-600">
                            Drop sample photos here or click to upload
                          </p>
                        </div>
                        <div className="mt-4">
                          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Photos
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedJobData.type === 'view-sample' && (
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Sample Photos Status</h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          selectedJobData.status === 'approved' ? 'bg-green-100 text-green-800' :
                          selectedJobData.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {selectedJobData.status}
                        </span>
                      </div>
                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-600">
                          Your sample photos are being reviewed by the staff and customer.
                          You will be notified when the review is complete.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select an item to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}