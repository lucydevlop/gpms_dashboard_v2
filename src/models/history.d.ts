import { IParkinglotObj } from '@models/parkinglot';
import { ECategory } from '@/constants/list';
import { IFacilityObj } from '@models/facility';

export interface IActionsHistoryObj {
  id: number;
  create_dt: number | Date;
  userName: string;
  parkinglotId: number;
  parkinglotName: string;
  gateId: string;
  gateName: string;
  category: ECategory;
  facilityId: string;
  facilityName: string;
  disabilityContent: string;
  actionContent: string;
  status: string;
  resolvedYn: string;
}

export interface IDisabilityObj {
  createDate: number | Date;
  gateGroupId: string;
  facilityIdentity: string;
  contents: string;
  status: string;
  actionContents: string;
  resolvedMember?: string;
  parkinglot: IParkinglotObj;
  facilityErrorId: number;
}

export interface IDisabilityDetailObj {
  createDate: number | Date;
  gateGroupId: string;
  facilityIdentity: string;
  contents: string;
  status: string;
  resolvedMember?: string;
  parkinglot: IParkinglotObj;
  facilityErrorId: number;
  errorHistoryList: IDisabilityObj[];
  category: ECategory;
  facility: IFacilityObj;
}
