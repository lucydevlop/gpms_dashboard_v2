import {
  EDayRangeType,
  EDelYn,
  EDiscountApplyType,
  EDiscountType,
  EPayType
} from '@/constants/list';
import { ICorpObj } from '@models/corp';

export interface IDiscountClassObj {
  sn: number;
  discountType: EDiscountType;
  discountNm: string;
  discountApplyType: EDiscountApplyType;
  dayRange: EDayRangeType;
  unitTime: number;
  disUse: EPayType;
  disMaxNo: number;
  disMaxDay: number;
  disMaxMonth: number;
  disPrice: number;
  effectDate: Date;
  expireDate: Date;
  delYn: EDelYn;
  aplyCnt?: number;
  //not metadata
  disable: boolean;
}

export interface ICorpDiscountClassObj {
  sn: number;
  corpSn: number;
  discountClassSn: number;
  totalQuantity: number;
  useQuantity: number;
  orderNum: number;
  delYn: EDelYn;
  discountClass: IDiscountClassObj;
  corp: ICorpObj;
  ableCnt: number;
  aplyCnt?: number;
}

export interface IAbleDiscountClassReq {
  corpSn: number;
  date: string;
  inSn: number;
}
