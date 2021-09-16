import { IStatisticsInoutDaySearchReq } from '@models/statisticsInout';
import {
  disabledDateAfterToday,
  formColProps16Config,
  formColProps6Config,
  IFormFieldConfig
} from '@utils/form';
import { localeStore } from '@store/localeStore';
import { FormType } from '@/constants/form';
import { datePickerFormat, monthPickerFormat } from '@/constants';
import moment from 'moment';

const regisDateRangeConfig = {
  rules: [
    {
      type: 'array',
      required: false,
      message: localeStore.localeObj['alert.select.time'] || '시간을 선택하세요'
    }
  ],
  format: datePickerFormat,
  initialValue: [moment(new Date()).subtract(7, 'days'), moment(new Date())]
};

const regisMonthRangeConfig = {
  rules: [
    {
      type: 'array',
      required: false,
      message: localeStore.localeObj['alert.select.time'] || '시간을 선택하세요'
    }
  ],
  format: monthPickerFormat,
  initialValue: [moment(new Date()).subtract(7, 'months'), moment(new Date())]
};

export function searchStatisticsInoutDayFields(): IFormFieldConfig<
  keyof IStatisticsInoutDaySearchReq
>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'createTm',
      label: '조회기간',
      component: {
        type: FormType.RangePicker,
        option: {
          placeholder: [
            localeObj['label.startDate'] || '시작일',
            localeObj['label.endDate'] || '종료일'
          ],
          allowClear: true,
          disabledDate: disabledDateAfterToday
        }
      },
      fieldOption: regisDateRangeConfig
    }
  ];
}

export function searchStatisticsInoutMonthFields(): IFormFieldConfig<
  keyof IStatisticsInoutDaySearchReq
>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'createTm',
      label: '조회기간',
      component: {
        type: FormType.RangePicker,
        option: {
          placeholder: [
            localeObj['label.startDate'] || '시작일',
            localeObj['label.endDate'] || '종료일'
          ],
          allowClear: true,
          disabledDate: disabledDateAfterToday,
          format: 'YYYY-MM'
        }
      },
      fieldOption: regisMonthRangeConfig
    }
  ];
}
