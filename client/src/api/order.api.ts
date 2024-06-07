import { Order, OrderDetailItem, OrderSheet } from "../models/order.model";
import { httpClient, requestHandler } from "./http";

export const order = async (orderData: OrderSheet) => {
  const response = await httpClient.post("/orders", orderData);
  return response.data;
};

export const fetchOrders = async () => {
  const response = await httpClient.get<Order[]>("/orders");
  return response.data;
};
export const fetchOrder = async (orderId: number) => {
  const response = await httpClient.get<OrderDetailItem[]>(
    `/orders/${orderId}`
  );
  return response.data;
};

export const order1 = async (orderData: OrderSheet) => {
  return await requestHandler("post", "/orders", orderData);
};
//리팩토링 한 axios요청
