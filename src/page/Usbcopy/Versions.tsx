import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import UpdatesTable from './UpdatesTable';
interface VersionsProps {
  selectedOrderData: any;
}

function Versions({ selectedOrderData }: VersionsProps) {
  const { version_id, section } = useParams();

  const padType = section?.substring(0, 4);

  const pad_line_items_id = selectedOrderData?.pad_line_items?.find(
    (item: any) => item.pad_abbreviation == padType && item.versions_id == version_id
  )?.pad_line_items_id;

  return (
    <>
      {(() => {
        // Get items for current version
        const versionItems = selectedOrderData?.line_items?.filter(
          (item: any) => item.versions_id == version_id && item.pad_abbreviation === "main"
        ) || [];

        // Sort items (type 4 last)
        const sortedItems = versionItems.sort((a: any, b: any) => {
          if (a.line_item_type === 4) return 1;
          if (b.line_item_type === 4) return -1;
          return 0;
        });

        // Combine into single object with concatenated strings
        const combinedItem = {
          name: sortedItems.map((item: any) => item.line_item_name).join(' '),
          description: sortedItems.map((item: any) => {
            if (item.line_item_type === 4 && item.line_item_desc.includes('Color: ')) {
              return item.line_item_desc.replace('Color: ', '');
            }
            return item.line_item_desc;
          }).join(' ')
        };

        return (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6 mx-3">
            <div className="flex items-center space-x-4 mb-4 last:mb-0">
              <img
                src={sortedItems[0]?.image_url || 'https://images.unsplash.com/photo-1618410320928-25228d811631?auto=format&fit=crop&w=50&h=50&q=80'}
                alt={combinedItem.name}
                className="w-[50px] h-[50px] object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {combinedItem.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {combinedItem.description}
                </p>
              </div>
            </div>
          </div>
        );
      })()}
      <div className="bg-white dark:bg-white rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ml-3">
        <h1>Hello</h1>
        {/* <Outlet context={{ selectedOrderData }} /> */}
        {/* {selectedOrderData.usbcopy_updates && selectedOrderData.usbcopy_updates.length > 0 && (
          <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Updates</h3>
            <UpdatesTable updates={selectedOrderData.usbcopy_updates} />
          </div>
        )} */}
      </div>
    </>
  )
}

export default Versions;
