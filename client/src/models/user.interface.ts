import { userType } from "@/models/userType.enum";

export interface iUser {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  id: number;
  profileUrl: string;
  userType: userType;
}
