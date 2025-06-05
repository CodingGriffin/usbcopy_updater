import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import OrdersDetail from "../../../page/Vendor/OrdersDetail";
import actions from "../../../states/Orders/actions";

import { Order } from '../../../types';

function OrderDetail() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const hash = window.location.hash;
  
  const {
    order,
    loading,
    error,
  } = useSelector((state: any) => state.orders);

  useEffect(() => {
    if (!order.data || order.data?.job?.job_number !== orderId) {
      getOrder();
    }
  }, [orderId]);

  const getOrder = () => {
    dispatch({
      type: actions.GET_ORDER,
      payload: {
        mode: "getAll",
        job_number: orderId,
        hash: hash
      }
    });
  }
  
  return (
    <OrdersDetail selectedOrderData={order.data ? order.data : null} />
  )

}

export default OrderDetail
