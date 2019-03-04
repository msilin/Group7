import { iOrderItem } from "./orderItem.interface";

export interface iOrder {
  id: number;
  shippingAddress: string;
  trackingNumber: number;
  date: Date;
  items: iOrderItem[];
}
