import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Versions from '../../../page/Vendor/Versions';
import { useDispatch, useSelector } from 'react-redux';

import { STEP_STATUS } from '../../../types';
interface OrderContext {
  selectedOrderData: any;
  setSelectedStep: (step: number) => void;
}

export default function VersionsContainer() {
  const { selectedOrderData, setSelectedStep } = useOutletContext<OrderContext>();
  const { version_id, section } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [currentStatus, setCurrentStatus] = useState<any>(null);
  const [pad_line_items_id, setPadLineItemsId] = useState<number | null>(null);
  const hash = window.location.hash;

  const {
    status,
    loading,
    error,
  } = useSelector((state: any) => state.PADStatus);

  
  const job_number = selectedOrderData?.job?.job_number;
  
  useEffect(() => {
    const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');
    const _pad_line_items_id = selectedOrderData?.pad_line_items?.find(
      (item: any) => item.pad_abbreviation == padType && item.versions_id == version_id
    )?.pad_line_items_id;

    setPadLineItemsId(_pad_line_items_id);

  }, [pad_line_items_id]);

  useEffect(() => {
    if (status?.data) {
      const data = status.data.length > 0 
        ? status.data.reduce((max: any, current: any) => 
            (current.event_id > max.event_id) ? current : max
          )
        : null;

      setCurrentStatus(data);

      if (currentStatus) {
        const currentAbbr = currentStatus.event_type_abbr;
        let step = 0;
        console.log('currentAbbr at vendor===>', currentAbbr)

        if (STEP_STATUS.proof.includes(currentAbbr)) {
          step = 1;
        } else if (STEP_STATUS.photoSample.includes(currentAbbr)) {
          step = 2;
        } else if (STEP_STATUS.liveSample.includes(currentAbbr)) {
          step = 3;
        }

        console.log(currentAbbr, step, currentStatus)

        // setStep(step);
      }
    }
  }, [status, currentStatus]);

  const setStep = async (step: number) => {
    await setCurrentStep(step);
    await setSelectedStep(step)
    switch (section) {
      case 'data':
        if (step ==1) {
          navigate(`../${version_id}/${section}/files`);
        } else if (step == 2) {
          navigate(`../${version_id}/${section}/samples`);
        } else if (step == 3) {
          navigate(`../${version_id}/${section}/production`);
        }
        break;
      case 'artwork':
        if (step ==1) {
          navigate(`../${version_id}/${section}/files`);
        } else if (step == 2) {
          navigate(`../${version_id}/${section}/samples`);
        } else if (step == 3) {
          navigate(`../${version_id}/${section}/production`);
        }
        break;
      default:
        if (step ==1) {
          navigate(`../${version_id}/${section}/files`);
        } else if (step == 2) {
          navigate(`../${version_id}/${section}/samples`);
        } else if (step == 3) {
          navigate(`../${version_id}/${section}/production`);
        }
        break;
    }
  };

  return (
    <Versions 
      selectedOrderData={selectedOrderData}
      currentStep={currentStep}
      currentAbbr={currentStatus?.event_type_abbr}
      setStep={setStep}
    />
  );
}
