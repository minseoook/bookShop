import { useEffect, useState } from "react";
import { Order, OrderListItem } from "../models/order.model";
import { fetchOrder, fetchOrders } from "../api/order.api";

export const useOrders = () => {
  const [orders, setorders] = useState<OrderListItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders().then((orders) => setorders(orders));
  }, []);

  const selectOrderItem = (orderId: number) => {
    if (orders.filter((order) => order.id === orderId)[0].detail) {
      setSelectedId(orderId);
    }
    fetchOrder(orderId).then((orderDetail) => {
      setSelectedId(orderId);
      setorders(
        orders.map((order) => {
          if (order.id === orderId) {
            return {
              ...order,
              detail: orderDetail,
            };
          }
          return order;
        })
      );
    });
  };

  return { orders, selectedId, selectOrderItem };
};
