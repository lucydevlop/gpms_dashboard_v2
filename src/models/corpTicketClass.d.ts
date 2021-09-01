import { EDelYn, EOnOff, EPayType, EStatus } from '@/constants/list';
import { IDiscountClassObj } from '@models/discountClass';
import { ICorpObj } from '@models/corp';

export interface ICorpTicketClassObj {
  sn: number;
  name: string;
  effectDate?: Date;
  expireDate?: Date;
  discountClassSn: number;
  onceMax: number;
  dayMax: number;
  monthMax: number;
  saleType: EPayType;
  price: number;
  extendYn: EOnOff;
  delYn: EDelYn;
  discountClass: IDiscountClassObj;
  vehicleNo?: string;
  discountNm?: string;
  quantity?: string;
  createDate?: Date;
  discountType?: number;
  calcYn?: EDelYn;
  ticketClassSn?: number;
}

export interface ICorpTicketSummaryObj {
  corp: ICorpObj;
  tickets: ICorpTicketSummayTicketObj[];
}

export interface ICorpTicketSummayTicketObj {
  total: number;
  id: number;
  title: string;
  use: number;
}

export interface ICorpTicketAddObj {
  corpName: string;
  corpSn: number;
  corpTicketClassSn: number;
  cnt: number;
}

export interface ICorpTicketSearchReq {
  corpSn: number;
  startDate?: string;
  endDate?: string;
  applyStatus?: string;
  vehicleNo?: string;
  createTm?: number[];
  ticketClassSn?: number;
}
