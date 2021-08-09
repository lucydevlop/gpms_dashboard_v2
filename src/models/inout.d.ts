import { EDelYn, EInoutType, ETicketType } from '@/constants/list';
import { IDiscountClassObj } from '@models/discountClass';

export interface IInoutObj {
  type: EInoutType;
  parkinSn?: number;
  vehicleNo?: string;
  parkcartype: ETicketType;
  inGateId?: string;
  inDate: Date;
  parkoutSn?: number;
  outDate?: Date | null;
  outGateId?: string;
  parktime?: number;
  parkfee?: number;
  payfee?: number;
  discountfee?: number;
  inImgBase64Str?: string;
  outImgBase64Str?: string;
  ticketCorpName?: string;
  memo?: string;
  paymentAmount?: number;
  dayDiscountfee?: number;
  addDiscountClasses?: IInoutDiscountAplyObj[];
  aplyDiscountClasses?: IInoutDiscountObj[];
}

export interface IInoutSelectReq {
  parkinglotId?: number;
  dateType: string;
  startDate: string;
  endDate: string;
  createTm: number[];
  vehicleNo?: string;
}

export interface IInoutDiscountAplyObj {
  inSn: number;
  discountClassSn: number;
  cnt: number;
}

export interface IInoutDiscountObj {
  sn: number;
  discountType: ETicketType;
  corpSn?: number;
  discountClassSn: number;
  ticketHistSn?: number;
  inSn: number;
  quantity: number;
  useQuantity: number;
  applyDate?: Date | null;
  delYn: EDelYn;
  calcYn: EDelYn;
  outSn?: number;
  discountClass: IDiscountClassObj;
  //not metadata
  disabled: boolean;
}
