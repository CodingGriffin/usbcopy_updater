import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../../../states/Orders/actions";

import OrdersTab from "../../../page/Usbcopy"

function OrdersList() {

  const dispatch = useDispatch();
  const hash = window.location.hash;
  
  const {
    orders,
    loading,
    error,
  } = useSelector((state: any) => state.orders);

  useEffect(() => {
    dispatch({
      type: actions.GET_ORDERS,
      payload: {
        jobStatus_exclude: '0',
        jobStatus_include: '2, 3',
        padStatus_include: "5",
        sortby: "InHandsDate",
        order: "ASC",
        joblimit: 10000,
        p: 1,
        d: 1,
        hash: hash
        // e_n: "Hamskea Archery Solutions"
      }
    });
  }, [dispatch]);
  
  return (
    <OrdersTab orders={orders.jobs ? orders.jobs : []} />
  )
}

export default OrdersList