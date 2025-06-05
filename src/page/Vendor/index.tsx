import React, { useState } from 'react';
import OrdersList from './OrdersList';
import { useNavigate } from 'react-router-dom';
import { Order } from '../../types';

interface OrdersTabProps {
  orders: Order[];
}

export default function OrdersTab({orders}: OrdersTabProps) {
  const navigate = useNavigate();

  const setSelectedOrder = (id: string) => {
    navigate(`${id}`);
  };

  return <OrdersList orders={orders} setSelectedOrder={setSelectedOrder} />;
}
