import { ECategory, EGateType } from '@/constants/list';

export interface IFacilityObj {
  facilityId: number;
  facilityIdentity: string;
  facilityName: string;
  parkinglotSn: number;
  category: ECategory;
  gateGroupId: string;
  gateGroupName: string;
  status: string;
  health: string;
}

export interface IFacilitySummaryObj {
  total: number;
  active: number;
  failure: number;
}
