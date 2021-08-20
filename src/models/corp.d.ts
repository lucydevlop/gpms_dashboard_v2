import { EDelYn } from '@/constants/list';

export interface ICorpObj {
  sn: number;
  corpId: string;
  corpName: string;
  createdBy: Date;
  delYn: EDelYn;
  dong: string;
  form: number;
  ho: string;
  resident: number;
  tel: string;
  updateBy: string;
  updateDate: Date;
}
