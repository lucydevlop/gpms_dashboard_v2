import { EDelYn } from '@/constants/list';
import { ICorpTicketClassObj } from '@models/corpTicketClass';
import { ICorpObj } from '@models/corp';

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
