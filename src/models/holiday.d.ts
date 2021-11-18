import { EDelYn } from '@/constants/list';

export interface IHolidayObj {
  sn?: number;
  name: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  isWorking: boolean;
  type: string;
  delYn: EDelYn;
  //non entity
  working: string;
}
