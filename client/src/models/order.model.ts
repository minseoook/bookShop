export interface Order {
  id: number;
  createdAt: string;
  address: string;
  receiver: string;
  contact: string;
  bookTitle: string;
  totalQuantity: number;
  totalPrice: number;
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
  bookId: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

export interface OrderListItem extends Order {
  detail?: OrderDetailItem[];
}
