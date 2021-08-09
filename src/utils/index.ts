import moment, { Moment } from 'moment';
import { message } from 'antd';

export const getBeginTimestamp = (date: Date): number =>
  new Date(date.toDateString()).getTime() / 1000;

export const getEndTimestamp = (date: Date): number =>
  new Date(`${date.toDateString()} 23:59:59`).getTime() / 1000;

export const getQueryRangeDate = (dates: Moment[]) => [
  getBeginTimestamp(new Date(dates[0].unix() * 1000)),
  getEndTimestamp(new Date(dates[1].unix() * 1000))
];
