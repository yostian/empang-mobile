import type { PaymentMethod } from '../types/payment';

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  cash: 'Tunai',
  bank_transfer: 'Transfer Bank',
  qris: 'QRIS',
};
