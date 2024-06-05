export interface Order {
  id: number;
  created_at: string;
  address: string;
  receiver: string;
  contact: string;
  book_title: string;
  total_quantity: number;
  total_price: number;
}

export interface OrderSheet {
  items: number[];
  delivery: Delivery;
  firstBookTitle: string;
  totalQuantity: number;
  totalPrice: number;
}

export interface Delivery {
  address: string;
  receiver: string;
  contact: number;
}

export interface OrderDetailItem {
  book_id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

export interface OrderListItem extends Order {
  detail?: OrderDetailItem[];
}
