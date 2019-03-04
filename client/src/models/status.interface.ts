import { iOrder } from "./order.interface";
import { iUser } from "./user.interface";
import { statusType } from "../../../api/entity/status.entity";

export interface iStatus {
  id: number;
  order: iOrder;
  user: iUser;
  date: Date;
  type: statusType;
  isCurrent: boolean;
}
