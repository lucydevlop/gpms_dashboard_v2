import { EDelYn, EPayMethod, ETicketType, EVehicleType } from '@/constants/list';
import { ICorpObj } from '@models/corp';

export interface ITicketObj {
  sn: number;
  vehicleNo: string;
  vehicleType: EVehicleType;
  effectDate: Date | number | string;
  expireDate: Date | number | string;
  ticketType: ETicketType;
  corp: ICorpObj;
  delYn: EDelYn;
  dateType: string;
  name?: string;
  tel?: string;
  vehiclekind?: string;
  etc?: string;
  etc1?: string;
  corpName?: string;
  corpSn?: number;
  ticketSn?: number;
  lastInDate?: Date;
  extendYn: EDelYn;
  nextSn: number | null;
  payMethod: EPayMethod | null;
  //non entity
}

export interface ITicketSelectReq {
  parkinglotId?: number;
  searchDateLabel: string;
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
  corpName: string;
}
