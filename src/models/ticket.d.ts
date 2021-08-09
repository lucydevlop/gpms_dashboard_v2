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
}

export interface ITicketSelectReq {
  parkinglotId?: number;
  dateType: string;
  startDate: string;
  endDate: string;
  createTm: number[];
  vehicleNo?: string;
}
