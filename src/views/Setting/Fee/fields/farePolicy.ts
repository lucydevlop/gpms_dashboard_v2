import { IFareBasicObj, IFareInfoObj, IFarePolicyObj } from '@models/fare';
import { disabledDateAfterToday, IFormFieldConfig, ISelectOptions } from '@utils/form';
import { ETicketType, ticketTypeOpt } from '@/constants/list';
import { FormType } from '@/constants/form';
import { datePickerFormat, timePickerFormat } from '@/constants';
import { localeStore } from '@store/localeStore';
import moment from 'moment';

export function getFarePolicyFields(
  fareInfos: ISelectOptions[],
  farePolicy?: IFarePolicyObj | null
): IFormFieldConfig<keyof IFarePolicyObj>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'fareName',
      label: '요금제명',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: farePolicy ? farePolicy.fareName : '',
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'timeRange',
      label: '반영시간',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        rules: [{ type: 'array', required: true, whitespace: true, message: '필수 입력 값입니다' }],
        // format: "HH:mm",
        initialValue: farePolicy
          ? [moment(farePolicy.startTime, 'HH:mm'), moment(farePolicy.endTime, 'HH:mm')]
          : ''
      },
      component: {
        type: FormType.TimePicker,
        option: {
          placeholder: [
            localeObj['label.startDate'] || '시작',
            localeObj['label.endDate'] || '종료'
          ],
          allowClear: true
        }
      }
    },
    {
      id: 'selectBasicFareSn',
      label: '기본요금',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }],
        initialValue: farePolicy ? farePolicy.basicFareSn.toString() : ''
      },
      component: {
        type: FormType.Select,
        selectOptions: fareInfos
      }
    },
    {
      id: 'selectAddFareSn',
      label: '추가요금',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: farePolicy ? farePolicy.addFareSn.toString() : ''
      },
      component: {
        type: FormType.Select,
        selectOptions: fareInfos
      }
    }
  ];
}
