import { EDelYn, ESearchUserType } from '@/constants/list';

export interface IUserObj {
  checkUse: EDelYn;
  createDate: Date;
  createdBy: string;
  delYn: EDelYn;
  id: string;
  idx: number;
  loginDate: Date;
  password: string;
  role: string;
  updateBy: string;
  updateDate: Date;
  userName: string;
  userPhone: string;
  wrongCount: number;
  searchLabel: ESearchUserType;
  searchText: string;
  userRole: string;
  passwordCnfirm: string;
}
