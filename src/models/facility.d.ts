import { ECategory, EGateType } from '@/constants/list';

export interface IFacilityObj {
  sn?: number;
  category: CategoryTypes;
  modelid: string;
  dtFacilitiesId: string;
  facilitiesId?: string;
  delYn: string;
  gateId: string;
  udpGateid?: string;
  ip?: string;
  port?: string;
  sortCount?: number;
  resetPort?: number;
  flagConnect?: number;
  gateType?: InoutTypes;
  lprType?: LprTypes;
  imagePath?: string;
  gateSvrKey?: string;
  fname: string;
  createBy?: string;
  createDate?: Date;
  updateBy?: string;
  updateDate?: Date;
  update: boolean;
}

export interface IFacilitySummaryObj {
  total: number;
  active: number;
  failure: number;
}
