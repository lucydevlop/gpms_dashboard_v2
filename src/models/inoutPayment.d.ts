import { EDelYn, EPaymentType } from '@/constants/list';

export interface IInoutPaymentObj {
  sn: number;
  type: EPaymentType;
  //inSn: number;
  vehicleNo: string;
  approveDateTime: string;
  payType: string;
  amount: number;
  cardCorp: string;
  cardNumber: string;
  transactionId: string;
  result: string;
  failureMessage: string;
  //delYn: EDelYn;
  receiptImage: string;
}
