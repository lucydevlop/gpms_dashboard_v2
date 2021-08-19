import { IFareInfoObj, IFarePolicyObj } from '@models/fare';
import { IFormFieldConfig, ISelectOptions } from '@utils/form';
import { FormType } from '@/constants/form';
import { localeStore } from '@store/localeStore';
import moment from 'moment';
import { fareTypeOpt } from '@/constants/list';

export function getFareInfoFields(
  fareInfo?: IFareInfoObj | null
): IFormFieldConfig<keyof IFareInfoObj>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'fareName',
      label: '요금명',
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
        initialValue: fareInfo ? fareInfo.fareName : '',
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'type',
      label: '요금타입',
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
        initialValue: fareInfo ? fareInfo.type : '',
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: fareTypeOpt
      }
    },
    {
      id: 'time1',
      label: '시간',
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
        // format: "HH:mm",
        initialValue: fareInfo ? fareInfo.time1 : ''
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'won1',
      label: '요금',
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
        // format: "HH:mm",
        initialValue: fareInfo ? fareInfo.won1 : ''
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'count1',
      label: '반복',
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
        initialValue: fareInfo ? fareInfo.count1 : '1'
      },
      component: {
        type: FormType.Input
      }
    }
  ];
}
