import { IParkinglotObj } from '@models/parkinglot';

export interface IVoipCallObj {
  id: number;
  create_dt: number | Date;
  parkinglot: IParkinglotObj;
  gateName: string;
}
