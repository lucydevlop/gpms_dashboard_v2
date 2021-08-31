import { EDelYn, ETicketType } from '@/constants/list';
import { ICorpObj } from '@models/corp';

export interface IVisitorObj {
  effectDate: Date;
  expireDate?: Date;
  vehicleNo: string;
  etc?: string;
  etc1?: string;
  tel?: string;
  ticketType?: ETicketType;
  corpName?: string;
  corp?: ICorpObj;
  corpSn?: number;
  delYn: EDelYn;
  memo?: string;
  index?: number;
  sn?: nummber;
}

export interface IVisitorSearchReq {
  dateType: string;
  searchText?: string;
  searchLabel?: string;
  fromDate?: string;
  toDate?: string;
  ticketType?: ETicketType;
  delYn?: EDelYn;
  createTm: number[];
  vehicleNo?: string;
}
