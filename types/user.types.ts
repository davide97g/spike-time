import { PaymentRecord } from "./payment";

export interface STUserRecap {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
}
export interface STUser extends STUserRecap {
  credits: number; // 1 credit = 1 hour slot
  paymentHistory?: PaymentRecord[];
}
