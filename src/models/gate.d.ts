import { EGateActionType, EGateOpenActionType, EGateType } from '@/constants/list';

export interface IGateObj {
  sn?: number;
  gateName: string;
  gateId: string;
  gateType: EGateType;
  takeAction: EGateActionType;
  openAction: EGateOpenActionType;
  flagUse: number;
  udpGateId?: string;
  uploadCt: number;
  relaySvr: string;
  relaySvrKey?: string;
  resetSvr?: string;
  delYn: string;
  gateGroupId?: string;
  openType: IGateOpenTypeObj[];
  createBy?: string;
  createDate?: Date;
  updateBy?: string;
  updateDate?: Date;
  update: boolean;
}

export interface IGateOpenTypeObj {
  openAction: EGateOpenActionType;
  startTime: string;
  endTime: string;
}

export class CGate {
  sn: number = 0;
  gateName: string = '';
  gateId: string = '';
  gateType: string = '';
  public static nameof = (name: keyof CGate) => name;
}
