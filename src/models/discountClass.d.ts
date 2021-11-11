import {
  EDayRangeType,
  EDelYn,
  EDiscountApplyRate,
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
  discountApplyRate: EDiscountApplyRate;
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
  rcsUse: boolean;
  orderNo: number;
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
  name: string;
}

export interface IAbleDiscountClassReq {
  corpSn: number;
  date: string;
  inSn: number;
}
