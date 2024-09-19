import { PaymentRecord } from "./payment";

export interface STUser {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  credits: number; // 1 credit = 1 hour slot
  paymentHistory?: PaymentRecord[];
  isAdmin?: boolean;
}
