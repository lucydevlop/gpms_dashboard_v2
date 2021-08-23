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
  //none entity
  timeRange: number[];
}
