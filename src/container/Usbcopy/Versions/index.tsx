import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Versions from '../../../page/Usbcopy/Versions';
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

  const [pad_line_items_id, setPadLineItemsId] = useState<number | null>(null);
  const hash = window.location.hash;
  
  useEffect(() => {
    const padType = (section === 'data' ? 'data' : section === 'artwork' ? 'artw' : 'pack');
    const _pad_line_items_id = selectedOrderData?.pad_line_items?.find(
      (item: any) => item.pad_abbreviation == padType && item.versions_id == version_id
    )?.pad_line_items_id;

    setPadLineItemsId(_pad_line_items_id);

  }, [pad_line_items_id]);

  return (
    <Versions 
      selectedOrderData={selectedOrderData}
    />
  );
}
