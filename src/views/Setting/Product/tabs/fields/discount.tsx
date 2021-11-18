import { IDiscountClassObj } from '@models/discountClass';
import { IFormFieldConfig } from '@utils/form';
import { FormType } from '@/constants/form';
import {
  discountApplyRateOpt,
  discountApplyTypeOpt,
  discountTypeOpt,
  EDelYn,
  EDiscountApplyRate,
  EDiscountApplyType,
  EDiscountType
} from '@/constants/list';
import moment from 'moment';

export function DiscountFields(
  discount?: IDiscountClassObj
): IFormFieldConfig<keyof IDiscountClassObj>[] {
  return [
    {
      id: 'discountNm',
      label: '할인명',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: discount ? discount.discountNm : null,
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '할인명을 입력해주세요'
        }
      }
    },
    {
      id: 'discountType',
      label: '할인타입',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: discount ? discount.discountType : EDiscountType.DISCOUNT
      },
      component: {
        type: FormType.Select,
        selectOptions: discountTypeOpt
      }
    },
    {
      id: 'effectDate',
      label: '적용 시작일',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: discount ? moment(discount.effectDate) : moment(new Date())
      },
      component: {
        type: FormType.DatePicker
      }
    },
    {
      id: 'expireDate',
      label: '적용 종료일',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: discount ? moment(discount.expireDate) : moment('9999-12-31')
      },
      component: {
        type: FormType.DatePicker
      }
    },
    {
      id: 'discountApplyType',
      label: '할인적용유형',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: discount ? discount.discountApplyType : EDiscountApplyType.WON
      },
      component: {
        type: FormType.Select,
        selectOptions: discountApplyTypeOpt
      }
    },
    {
      id: 'unitTime',
      label: '할인적용값',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: discount ? discount.unitTime : null
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '할인적용값을 입력해주세요.'
        }
      }
    },
    {
      id: 'discountApplyRate',
      label: '할인적용률',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: discount ? discount.discountApplyRate : EDiscountApplyRate.VARIABLE
      },
      component: {
        type: FormType.Select,
        selectOptions: discountApplyRateOpt
      }
    },
    {
      id: 'rcsUse',
      label: 'RCS사용',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: discount ? discount.rcsUse : null
      },
      component: {
        type: FormType.Switch,
        option: {
          defaultChecked: discount ? discount.rcsUse : false
          // onChange: (e: any) => {
          //   e === true ? (discount!!.rcsUse = EDelYn.Y) : (discount!!.rcsUse = EDelYn.N);
          // }
        }
      }
    },
    {
      id: 'orderNo',
      label: 'RCS노출순서',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 9,
          xs: 9
        },
        wrapperCol: {
          xl: 15,
          xs: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: discount ? discount.orderNo : null
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '할인노출순서 입력해주세요.'
        }
      }
    },
    {
      id: 'sn',
      fieldOption: {
        initialValue: discount ? discount.sn : null
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'delYn',
      fieldOption: {
        initialValue: discount ? discount.delYn : null
      },
      component: {
        type: FormType.Input
      }
    }
  ];
}
