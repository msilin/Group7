import { iItem } from "./item.interface";

export interface iOrderItem {
  id: number;
  quantity: number;
  isPickup: boolean;
  item: iItem;
}
