import { EDelYn } from '@/constants/list';

export interface IFailureObj {
  sn: number;
  issueDateTime: Date;
  expireDateTime: Date;
  facilitiesId: string;
  fname: string;
  failureCode: string;
  failureType: string;
  failureFlag: number;
  syncYn: EDelYn;
}

export interface IFailureSearchReq {
  startDate: string;
  endDate: string;
  createTm: number[];
}
