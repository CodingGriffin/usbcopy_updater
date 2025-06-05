import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Files, Boxes, Camera, SwatchBook } from 'lucide-react';
import { Modal } from 'antd';

interface VersionsProps {
  selectedOrderData: any;
  currentStep: number;
  currentAbbr: string;
  setStep: (step: number) => void;
}

function Versions({ currentStep, selectedOrderData, currentAbbr, setStep}: VersionsProps) {
  const { version_id, section } = useParams();

  const steps = [
    { number: 1, title: 'Files', icon: <Files className="w-5 h-5" /> },
    { number: 2, title: 'Samples', icon: <SwatchBook className="w-5 h-5" /> },
    { number: 3, title: 'Production', icon: <Boxes className="w-5 h-5" /> },
  ];

  const padType = section?.substring(0, 4);

  const pad_line_items_id = selectedOrderData?.pad_line_items?.find(
    (item: any) => item.pad_abbreviation == padType && item.versions_id == version_id
  )?.pad_line_items_id;

  const updateStep = async (step: number) => {
    await setStep(step);
  }

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
      {section != 'bulk' &&
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />

          </div>
          <div className="ml-3 mb-4 relative flex justify-between">
            {steps.map((step) => (
              (section == 'data' && step.title == 'Samples') ? <></> :
              <button
                key={step.number}
                onClick={() => updateStep(step.number)}
                className={`flex items-center ${
                  currentStep === step.number
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep === step.number
                    ? 'bg-blue-600 text-white dark:bg-blue-500'
                    : 'bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600'
                }`}>
                  {step.icon}
                </div>
                <span className="ml-2 text-sm font-medium bg-white dark:bg-gray-800 px-2">
                  {(section == 'data' && step.title == 'Samples') ? 'Screenshots' : step.title}
                </span>
              </button>
              
            ))}
          </div>
        </div>
      }

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ml-3">
        <Outlet context={{ selectedOrderData, setStep, currentStep, currentAbbr }} />
      </div>
    </>
  )
}

export default Versions;
