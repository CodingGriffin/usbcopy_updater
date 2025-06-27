import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Truck, Package, Palette, Database, ChevronDown, ChevronRight, Upload } from 'lucide-react';
import { useNavigate, Outlet } from 'react-router-dom';
import actions from "../../states/UsbCopyUpdates/actions";
import UpdatesTable from './UpdatesTable';
import TabNav from '../../component/TabNavComponent';

interface OrdersDetailProps {
  selectedOrderData: any | null;
}

function OrdersDetail({selectedOrderData}: OrdersDetailProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    updates,
    loading,
    error,
  } = useSelector((state: any) => state.usbcopyUpdates);
  
  const [expandedVersions, setExpandedVersions] = useState<Record<string, boolean>>({});
  const [selectedSection, setSelectedSection] = useState<'Window' | 'Mac' | null>('Window');
  const [selectedVersionNum, setSelectedVersionNum] = useState(1);
  const [activeTab, setActiveTab] = useState<String>('versions');

  // Simulating data fetch - replace with actual API call

  useEffect(() => {
    getUpdates();
  }, []);

  const getUpdates = () => {
    const url = new URL(window.location.href);
    
    // Set or update the query parameter
    const verNum = url.searchParams.get('ver_num');
    const osType = url.searchParams.get('os_type');

    dispatch({
      type: actions.GET_UPDATES,
      payload: {
        mode: "getUpdates",
        job_num: selectedOrderData?.job?.job_number,
        ver_num: verNum,
        os_type: osType,
      }
    });
  }

  const deleteUpdate = (id: any) => {
    const url = new URL(window.location.href);
    
    // Set or update the query parameter
    const verNum = url.searchParams.get('ver_num');
    const osType = url.searchParams.get('os_type');

    dispatch({
      type: actions.GET_UPDATES,
      payload: {
        mode: "deleteUpdate",
        id: id,
        job_num: selectedOrderData?.job?.job_number,
        ver_num: verNum,
        os_type: osType,
      }
    });
  }

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
      // setSelectedSection(null);
    }
  };

  const chooseSection = async (section: 'Window' | 'Mac' | null, version_id: number) => {
    const url = new URL(window.location.href);
    
    // Set or update the query parameter
    url.searchParams.set('ver_num', String(version_id+1));
    url.searchParams.set('os_type', String(section));

    dispatch({
      type: actions.GET_UPDATES,
      payload: {
        mode: "getUpdates",
        job_num: selectedOrderData?.job?.job_number,
        ver_num: (version_id+1),
        os_type: section,
      }
    });

    // Update the URL in the browser's address bar without reloading the page
    window.history.pushState({}, '', url);
    setSelectedSection(section);
    setSelectedVersionNum(version_id);
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
          {selectedOrderData?.versions?.filter((version: any) => 
              selectedOrderData.pad_line_items.some((padLineItem: any) => 
                  padLineItem.versions_id === version.version_id && padLineItem.pad_abbreviation === 'copy'
              )
          ).map((version: any, index: number) => (
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
                        onClick={() => chooseSection(section as 'Window' | 'Mac', index)}
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
        {/* <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Updates</h3> */}

        <div className="mb-4 ms-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab =='versions' ?
            <UpdatesTable updates={updates.data} section={selectedSection} versionNum={selectedVersionNum} deleteUpdate={deleteUpdate} />
            : 
            <></>
          }
        </div>
      </div>
    </div>
  );
}

export default OrdersDetail;
