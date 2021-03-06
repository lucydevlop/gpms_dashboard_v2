import { disabledDateAfterToday, IFormFieldConfig } from '@utils/form';
import { IFailureSearchReq } from '@models/failure';
import { FormType } from '@/constants/form';
import { localeStore } from '@store/localeStore';
import { datePickerFormat } from '@/constants';
import moment from 'moment';
import { categoryOpt } from '@/constants/list';

const regisDateRangeConfig = {
  rules: [
    {
      type: 'array',
      required: false,
      message: localeStore.localeObj['alert.select.time'] || '시간을 선택하세요'
    }
  ],
  format: datePickerFormat,
  initialValue: [moment(new Date()).subtract(3, 'days'), moment(new Date())]
};

export function searchFailureFields(): IFormFieldConfig<keyof IFailureSearchReq>[] {
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
    },
    {
      id: 'category',
      label: '구분',
      component: {
        type: FormType.Select,
        option: {
          placeholder: localeObj['label.choose'] || '선택해주세요',
          allowClear: true
        },
        selectOptions: categoryOpt
      }
    }
  ];
}
