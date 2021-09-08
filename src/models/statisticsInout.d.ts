export interface IStatisticsInoutCountObj {
  date: string;
  inCnt?: number;
  outCnt?: number;
  inNormalCnt?: number;
  inTicketCnt?: number;
  inUnrecognizedCnt: number;
  outNormalCnt?: number;
  outTicketCnt?: number;
  outUnrecognizedCnt: number;
}

export interface IStatisticsInoutPaymentObj {
  date: string;
  parkFee?: number;
  discountFee?: number;
  dayDiscountFee?: number;
  payFee?: number;
  nonPayment?: number;
  payment?: number;
}

export interface IStatisticsInoutDaySearchReq {
  startDate: string;
  endDate: string;
  createTm: number[];
}
