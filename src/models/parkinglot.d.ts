import { IQueryListParams } from '@models/global';
import { Moment } from 'moment';
import {
  ECity,
  EDayRangeType,
  EDelYn,
  EDiscountApplyCriteriaType,
  EOnOff,
  ERemoteTool
} from '@/constants/list';
import { IActionsHistoryObj } from '@models/history';

/**
 * parkinglot model
 */
export interface IParkinglotObj {
  parkId: string;
  siteId: string;
  siteName: string;
  limitqty: number;
  saupNo?: string;
  tel?: string;
  ceoName?: string;
  postCode?: string;
  address?: string;
  firsttime?: number;
  firstfee?: number;
  returntime?: number;
  overtime?: number;
  overfee?: number;
  addtime?: number;
  dayfee?: number;
  parkingSpotStatusNotiCycle?: number;
  facilitiesStatusNotiCycle?: number;
  flagMessage?: number;
  businame?: string;
  saleType?: string;
  tmapSend: string;
  vehicleDayOption: string;
  space?: Space | null;
  externalSvr?: string;
  ip?: string;
  city?: ECity;
  rcsParkId?: number | null;
  visitorExternal?: string;
  visitorExternalKey?: string | null;
  operatingDays?: EDayRangeType;
  visitorRegister?: EOnOff;
  createBy?: string;
  createDate?: Date;
  updateBy?: string;
  updateDate?: Date;
  enterNoti?: EnterNoti;
  discCriteria?: DiscountApply;
  //non entity
  criteria?: EDiscountApplyCriteriaType;
  baseFeeInclude?: EDelYn;
}

export type Space = {
  gateGroupId: string;
  space: number;
};

export type EnterNoti = {
  use?: EOnOff;
  url?: string;
};

export type DiscountApply = {
  criteria?: EDiscountApplyCriteriaType;
  baseFeeInclude?: EDelYn | null;
};

export interface IParkinglotListReq extends IQueryListParams {
  city: ECity;
  name: string;
  createTm: Moment[];
}

export interface IEditParkinglotReq extends IQueryListParams {
  name: string;
  city: string;
  ip: string;
  remoteTool: ERemoteTool;
  remoteKey: string;
  id: number;
}

export interface IParkinglotStatisticsObj {
  parkinglotCnt: number;
  facilitiesCnt: number;
  utilzation: IParkinglotUtilzationObj;
  newActions: IActionsHistoryObj[];
  longActions: IActionsHistoryObj[];
  dailyDisabilities: IParkinglotDailyErrosObj;
  parkinglotErrorSum: IParkinglotErrorSummaryObj[];
}

export interface IParkinglotUtilzationObj {
  normal: number;
  error: number;
  inActive: number;
}

export interface IParkinglotErrorReq {
  city?: ECity;
  name?: string;
  startDate: string;
  endDate: string;
  createTm: number[];
}

export interface IParkinglotSelectReq {
  city?: ECity;
  name: string;
}

export interface IParkinglotDailyErrosObj {
  days: string[];
  disabilities: number[];
  resolves: number[];
}

export interface IParkinglotErrorSummaryObj {
  parkinglotName: string;
  total: number;
  remain: number;
  today: number;
}
