import { ECorpSearchCondition, EDayRangeType, EDelYn } from '@/constants/list';
import { IDiscountClassObj } from '@models/discountClass';
import { ICorpTicketClassObj } from '@models/corpTicketClass';

export interface ICorpObj {
  sn?: number;
  corpId?: string;
  corpName: string;
  createdBy?: string;
  delYn: string;
  dong: string;
  form?: number;
  ho: string;
  resident?: number;
  tel?: string;
  updateBy?: string;
  updateDate?: Date;
  ceoName?: string;
  userRole?: string;
  userName?: string;
  password: string;
  userPhone?: string;
}

export interface ICorpSearchReq {
  searchLabel?: ECorpSearchCondition;
  searchText?: string;
  useStatus?: EDelYn;
}

export interface ICorpTicketObj {
  sn?: number;
  corpSn: number;
  classSn: number;
  totalQuantity: number;
  useQuantity?: number;
  orderNum?: number;
  delYn: EDelYn;
  corpTicketClass: ICorpTicketClassObj;
  corp: ICorpObj;
  totalCnt: number;
  ableCnt: number;
  todayUse: number;
  // non entity
  applyCnt?: number;
}

export interface ICorpSearchVehicleObj {
  sn: number;
  vehicleNo: string;
  inDate: Date;
  imImagePath?: string;
  selected?: boolean | false;
}
