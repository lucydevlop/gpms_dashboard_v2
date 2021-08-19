import { EColorType, EMessageClassType, EMessageTypeType } from '@/constants/list';

export interface IDisplayMsgObj {
  sn?: number;
  messageClass: EMessageClassType;
  messageType: EMessageTypeType;
  messageCode: string;
  order: number;
  lineNumber: number;
  colorCode: EColorType;
  messageDesc: string;
  createBy?: string;
  createDate?: Date;
  updateBy?: string;
  updateDate?: Date;
  update?: boolean;
  line1Status?: string;
  line2Status?: string;
}
