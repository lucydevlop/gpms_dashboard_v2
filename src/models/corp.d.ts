import { ECorpSearchCondition, EDelYn } from '@/constants/list';

export interface ICorpObj {
  sn?: number;
  corpId: string;
  corpName: string;
  createdBy?: string;
  delYn: EDelYn;
  dong: string;
  form?: number;
  ho: string;
  resident?: number;
  tel: string;
  updateBy?: string;
  updateDate: Date;
  ceoName: string;
  userRole?: string;
  userName: string;
}

export interface IFileCorpObj {
  sn?: number;
  corpId?: string;
  createdBy?: string;
  delYn: EDelYn;
  dong: string;
  form?: number;
  ho: string;
  resident?: number;
  tel?: string;
  updateBy?: string;
  updateDate: Date;
  corpName: string;
  userRole?: string;
  userName: string;
  userPhone: string;
}

export interface ICorpSearchReq {
  searchLabel?: ECorpSearchCondition;
  searchText?: string;
  useStatus?: EDelYn;
}

export interface ICorpCreateReq {
  corpName: string;
  dong: string;
  ho: string;
  password: string;
  userName: string;
  userPhone: string;
  userRole: string;
}
