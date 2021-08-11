export interface IStatisticsInoutDayObj {
  date: string;
  inCnt?: number;
  outCnt?: number;
  normalCnt?: number;
  ticketCnt?: number;
  unrecognizedCnt: number;
  parkFee?: number;
  discountFee?: number;
  dayDiscountFee?: number;
  payFee?: number;
}

export interface IStatisticsInoutDaySearchReq {
  startDate: string;
  endDate: string;
  createTm: number[];
}
