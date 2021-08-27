import { ECorpSearchCondition, EDelYn } from '@/constants/list';

export interface ICorpObj {
  sn?: number;
  corpId?: string;
  corpName: string;
  createdBy?: string;
  delYn: string;
  dong: string;
  form?: number;
  ho: string;
  resident?: number;
  tel?: string;
  updateBy?: string;
  updateDate?: Date;
  ceoName?: string;
  userRole?: string;
  userName?: string;
  password: string;
  userPhone?: string;
}

export interface ICorpSearchReq {
  searchLabel?: ECorpSearchCondition;
  searchText?: string;
  useStatus?: EDelYn;
}

export interface ICorpSearchVehicleObj {
  sn: number;
  vehicleNo: string;
  inDate: Date;
  imImagePath?: string;
  selected?: boolean | false;
}
