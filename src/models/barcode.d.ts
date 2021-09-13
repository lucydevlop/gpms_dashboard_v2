import { EDelYn } from '@/constants/list';
import { IDiscountClassObj } from '@models/discountClass';

export interface IBarcodeObj {
  sn?: number;
  startIndex: number;
  endIndex: number;
  decriptKey?: string;
  effectDate: Date;
  expireDate: Date;
  delYn: EDelYn;
}

export interface IBarcodeClassObj {
  sn?: number;
  start: number;
  end: number;
  discountClassSn: number;
  discountClass?: IDiscountClassObj;
  delYn: EDelYn;
}
