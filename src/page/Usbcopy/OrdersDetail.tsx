import { useState } from 'react';
import { ArrowLeft, Truck, Package, Palette, Database, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate, Outlet } from 'react-router-dom';
import UpdatesTable from './UpdatesTable';

interface OrdersDetailProps {
  selectedOrderData: any | null;
}

function OrdersDetail({selectedOrderData}: OrdersDetailProps) {
  const navigate = useNavigate();
  
  const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>({});
  const [selectedSection, setSelectedSection] = useState<'Window' | 'Mac' | null>('Window');

  // Simulating data fetch - replace with actual API call


  const resetView = () => {
    navigate('../');
  };

  const toggleVersion = (version: number) => {
    setExpandedVersions(prev => {
      // Create a new object with all versions closed
      const allClosed = Object.keys(prev).reduce((acc: any, key: any) => {
        acc[key] = false;
        return acc;
      }, {} as Record<number, boolean>);

      // Toggle the selected version
      return {
        ...allClosed,
        [version]: !prev[version]
      };
    });
    
    // Reset selected section when closing
    if (!expandedVersions[version]) {
      setSelectedSection(null);
    }
  };

  const chooseSection = async (section: 'Window' | 'Mac' | null, version_id: number) => {
    setSelectedSection(section);
  };

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'packaging': return <Package className="w-5 h-5" />;
      case 'artwork': return <Palette className="w-5 h-5" />;
      case 'data': return <Database className="w-5 h-5" />;
      case 'bulk': return <Database className="w-5 h-5" />;
      case 'shipments': return <Truck className="w-5 h-5" />;
      default: return null;
    }
  };

  if (!selectedOrderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      <div className="w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
        <div className="p-4 space-y-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={resetView}
            className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Orders
          </button>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Order #{selectedOrderData?.job?.job_number}
          </h2>
        </div>

        <div className="py-2 space-y-2">
          {selectedOrderData?.versions?.map((version: any, index: number) => (
          <>
            <button
              key={`${version.version_id}`}
              onClick={() => toggleVersion(index)}
              className="w-full text-left px-4 py-2 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <div className="flex flex-col">
                <span className="font-medium">Version {index+1}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{version.version_name}</span>
              </div>
              {expandedVersions[index] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {expandedVersions[index] && (
              <div className="pl-4">
                {['Window', 'Mac'].map((section) => {
                    return (
                      <button
                        key={`${version.version_id}-${section}`}
                        onClick={() => chooseSection(section as 'Window' | 'Mac', version.version_id)}
                        className={`w-full text-left px-4 py-2 flex items-center space-x-2 ${
                          selectedSection === section
                            ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {getSectionIcon(section)}
                        <span className="capitalize">{section}</span>
                      </button>
                    );
                })}
              </div>
            )}
          </>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Outlet context={{ selectedOrderData, selectedSection }} />
        {/* <h1>Hello</h1> */}
        {/* <Outlet context={{ selectedOrderData }} /> */}
        {selectedOrderData.usbcopy_updates && selectedOrderData.usbcopy_updates.length > 0 && (
          <div className="mb-4 ms-4 border-b border-gray-200 dark:border-gray-700 pb-4">
            <UpdatesTable updates={selectedOrderData.usbcopy_updates} section={selectedSection} />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersDetail;
