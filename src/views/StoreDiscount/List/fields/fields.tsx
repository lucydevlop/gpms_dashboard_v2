import { IFormFieldConfig, ISelectOptions } from '@utils/form';
import { ICorpTicketSearchReq } from '@models/corpTicketClass';
import { FormType } from '@/constants/form';
import { localeStore } from '@store/localeStore';
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

export function SearchCorpTicketFields(
  corpTicketClassOpt?: ISelectOptions[]
): IFormFieldConfig<keyof ICorpTicketSearchReq>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'createTm',
      label: '조회기준',
      colProps: {
        xl: 12,
        md: 24,
        lg: 24,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 10
        },
        wrapperCol: {
          xl: 16,
          xs: 14
        }
      },
      component: {
        type: FormType.RangePicker,
        option: {
          placeholder: [
            localeObj['label.startDate'] || '선택해주세요',
            localeObj['label.endDate'] || '종료일'
          ],
          allowClear: true
        }
      },
      fieldOption: regisDateRangeConfig
    },
    {
      id: 'ticketClassSn',
      label: '할인권명',
      colProps: {
        xl: 12,
        md: 24,
        lg: 24,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 10
        },
        wrapperCol: {
          xl: 16,
          xs: 14
        }
      },
      component: {
        type: FormType.Select,
        option: {
          allowClear: true
        },
        selectOptions: corpTicketClassOpt
      }
    }
    // {
    //   id: 'vehicleNo',
    //   label: '차량번호',
    //   colProps: {
    //     xl: 12,
    //     md: 24,
    //     lg: 24,
    //     xs: 24
    //   },
    //   formItemProps: {
    //     labelCol: {
    //       xl: 8,
    //       xs: 10
    //     },
    //     wrapperCol: {
    //       xl: 16,
    //       xs: 14
    //     }
    //   },
    //   component: {
    //     type: FormType.Input,
    //     option: {
    //       placeholder: '입력하세요'
    //     }
    //   }
    // }
  ];
}
