import {
  EDayRangeType,
  EDelYn,
  ETicketAplyType,
  ETicketType,
  EVehicleType
} from '@/constants/list';

export interface ITicketClassObj {
  sn: number;
  ticketName: string;
  ticketType: ETicketType;
  aplyType: ETicketAplyType;
  startTime?: string;
  endTime?: string;
  rangeType: EDayRangeType;
  effectDate?: Date;
  expireDate?: Date;
  price?: number;
  vehicleType: EVehicleType;
  available?: number;
  delYn: EDelYn;
  period?: Period | null;
  extendYn: EDelYn;
  //none entity
  timeRange: number[];
  periodType: string;
  periodNumber: number;
}

export type Period = {
  type: string;
  number: number;
};
