export interface PaymentRecord {
  /** @description stripe checkout session id */
  id: string;
  amount: number;
  product: string;
  date: string;
}
