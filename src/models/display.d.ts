import {
  EColorType,
  EDelYn,
  ELineStatus,
  EMessageClassType,
  EMessageTypeType
} from '@/constants/list';

export interface IDisplayMsgObj {
  sn?: number;
  messageClass: EMessageClassType;
  messageType: EMessageTypeType;
  messageCode: string;
  order: number;
  lineNumber: number;
  colorCode: EColorType;
  messageDesc: string;
  delYn: EDelYn;
}

export interface IDisplayInfoObj {
  sn?: number;
  line1Status: ELineStatus;
  line2Status: ELineStatus;
}

export interface IDisplayColorObj {
  sn?: number;
  colorCode: string;
  colorDesc?: string;
}

export interface IDisplayObj {
  messages: IDisplayMsgObj[];
  info?: IDisplayInfoObj;
  colors: IDisplayColorObj[];
}
