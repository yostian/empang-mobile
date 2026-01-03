export type PaymentMethod = 'cash' | 'bank_transfer' | 'qris';

export type PaymentStatus = 'UNPAID' | 'PARTIAL' | 'PAID' | 'CONFIRMING';

export interface Payment {
  method: PaymentMethod;
  serviceFee: number;
  homeServiceCharge: number;
  total: number;
  downPayment: number;
  remaining: number;
  status: PaymentStatus;
}
