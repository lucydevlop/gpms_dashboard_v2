import { EDelYn, EOnOff, EPayType, EStatus } from '@/constants/list';
import { IDiscountClassObj } from '@models/discountClass';

export interface ICorpTicketClassObj {
  sn: number;
  name: string;
  effectDate?: Date;
  expireDate?: Date;
  discountClassSn: number;
  onceMax: number;
  dayMax: number;
  monthMax: number;
  saleType: EPayType;
  price: number;
  extendYn: EOnOff;
  delYn: EDelYn;
  discountClass: IDiscountClassObj;
}
