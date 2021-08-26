import { formColProps6Config, IFormFieldConfig, disabledDateAfterToday } from '@utils/form';
import { FormType } from '@/constants/form';
// import { IRegionObj } from '@/interface/common';
import { IParkinglotListReq } from '@models/parkinglot';
import moment, { Moment } from 'moment';
import { datePickerFormat } from '@/constants';
import { localeStore } from '@store/localeStore';

const regisDateRangeConfig = {
  rules: [{ type: 'array', required: false, message: '请选择时间' }],
  format: datePickerFormat,
  initialValue: [moment(new Date()).subtract(29, 'days'), moment(new Date())]
};

export interface IFormProps extends IParkinglotListReq {
  createTm: Moment[];
}

export function fieldsConfig(): IFormFieldConfig<keyof IFormProps>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'city',
      label: '지역',
      ...formColProps6Config,
      component: {
        type: FormType.TreeSelect,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    // {
    //   id: 'parkinglotName',
    //   label: '주차장명',
    //   ...formColProps6Config,
    //   component: {
    //     type: FormType.Input,
    //     option: {
    //       placeholder: '입력하세요'
    //     }
    //   }
    // },
    {
      id: 'createTm',
      label: '등록일자',
      ...formColProps6Config,
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
