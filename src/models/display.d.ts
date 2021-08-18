import { EMessageClassType, EMessageTypeType } from '@/constants/list';

export interface IDisplayMsgObj {
  sn?: number;
  messageClass: EMessageClassType;
  messageType: EMessageTypeType;
  messageCode: string;
  order: number;
  lineNumber: number;
  colorCode: string;
  messageDesc: string;
  createBy?: string;
  createDate?: Date;
  updateBy?: string;
  updateDate?: Date;
  update?: boolean;
}
