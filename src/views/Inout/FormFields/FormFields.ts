import { localeStore } from '@store/localeStore';
import {
  disabledDateAfterToday,
  formColProps16Config,
  formColProps6Config,
  IFormFieldConfig
} from '@/utils/form';
import { IInoutSelectReq } from '@models/inout';
import { EInoutType, inoutSearchDateTypeOpt } from '@/constants/list';
import { FormType } from '@/constants/form';
import { datePickerFormat } from '@/constants';
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
  initialValue: [moment(new Date()).subtract(3, 'days'), moment(new Date())]
};

export function searchInoutFields(): IFormFieldConfig<keyof IInoutSelectReq>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'dateType',
      label: '조회기준',
      fieldOption: {
        initialValue: EInoutType.IN
      },
      ...formColProps16Config,
      component: {
        type: FormType.Select,
        option: {
          placeholder: localeObj['label.choose'] || '선택해주세요',
          allowClear: true
        },
        selectOptions: inoutSearchDateTypeOpt
      },
      formSubItemProps: {
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
    },
    {
      id: 'vehicleNo',
      label: '차량번호',
      ...formColProps6Config,
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    }
  ];
}
