import { IFarePolicyObj } from '@models/fare';
import { IFormFieldConfig, ISelectOptions } from '@utils/form';
import { FormType } from '@/constants/form';
import { localeStore } from '@store/localeStore';
import moment from 'moment';
import { dayTYpeOpt } from '@/constants/list';
import { WrappedFormUtils } from '@ant-design/compatible/lib/form/Form';

export function getFarePolicyFields(
  form: WrappedFormUtils<any>,
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
            localeObj['label.startTime'] || '시작시간',
            localeObj['label.endTime'] || '종료시간'
          ],
          allowClear: true,
          order: false
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
        initialValue: farePolicy?.basicFare ? farePolicy.basicFare.sn?.toString() : ''
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
        initialValue: farePolicy?.addFare ? farePolicy.addFare.sn?.toString() : ''
      },
      component: {
        type: FormType.Select,
        selectOptions: fareInfos
      }
    },
    {
      id: 'orderNo',
      label: '우선적용',
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
        initialValue: farePolicy ? farePolicy.orderNo : 1,
        rules: [{ required: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.InputNumber,
        option: {
          // onChange: (value: any) => {
          //   //console.log('orderNo', value, value.toString());
          //   form.setFieldsValue({ ['orderNo']: value });
          // },
          min: 0
        }
      }
    },
    {
      id: 'week',
      label: '적용일',
      colProps: {
        xl: 24,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 4,
          xs: 4
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: farePolicy ? farePolicy.week : ''
      },
      component: {
        type: FormType.CheckGroup,
        selectOptions: dayTYpeOpt
      }
    }
  ];
}
