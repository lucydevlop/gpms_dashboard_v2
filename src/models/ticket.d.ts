import { EDelYn, ETicketType, EVehicleType } from '@/constants/list';
import { ICorpObj } from '@models/corp';

export interface ITicketObj {
  sn: number;
  vehicleNo: string;
  vehicleType: EVehicleType;
  effectDate: Date;
  expireDate: Date;
  ticketType: ETicketType;
  corp: ICorpObj;
  delYn: EDelYn;
  dateType: string;
  name?: string;
  tel?: string;
  productName?: string;
  vehiclekind?: string;
  etc?: string;
  etc1?: string;
  corpName?: string;
  corpSn?: number;
}

export interface ITicketSelectReq {
  parkinglotId?: number;
  dateType: string;
  startDate: string;
  endDate: string;
  createTm: number[];
  vehicleNo?: string;
  delYn?: EDelYn;
  ticketType?: ETicketType;
  searchText?: string;
  searchLabel?: string;
  fromDate?: string;
  toDate?: string;
}
