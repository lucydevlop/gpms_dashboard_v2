import { ICorpTicketClassObj } from '@models/corpTicketClass';
import { IFormFieldConfig, ISelectOptions } from '@utils/form';
import { FormType } from '@/constants/form';
import { delYnOpt, EDelYn, EOnOff, EPayType, onOffSelectOpt, payTypeOpt } from '@/constants/list';
import { WrappedFormUtils } from '@ant-design/compatible/lib/form/Form';

function setLimit(form: WrappedFormUtils<any>, fieldName: string, value: string) {
  form.setFieldsValue({ [fieldName]: value });
}

function getLimit(form: WrappedFormUtils<any>, fieldName: string) {
  return form.getFieldValue(fieldName) === '999999999';
}

export const corpDiscountFields = (
  discount?: ICorpTicketClassObj,
  discountSelectClasses?: ISelectOptions[],
  // @ts-ignore
  form: WrappedFormUtils<any>
  // setLimitValue?: (key: string) => void,
  // setDisabled?: (key: string) => boolean
): IFormFieldConfig<keyof ICorpTicketClassObj>[] => [
  {
    id: 'name',
    label: '입주사할인권명',
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
      initialValue: discount ? discount.name : null,
      rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
    },
    component: {
      type: FormType.Input,
      option: {
        placeholder: '할인권명 입력해주세요'
      }
    }
  },
  {
    id: 'discountClassSn',
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
      initialValue: discount ? String(discount.discountClassSn) : null,
      rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
    },
    component: {
      type: FormType.Select,
      selectOptions: discountSelectClasses,
      option: {
        placeholder: ''
      }
    }
  },
  {
    id: 'onceMax',
    label: '1회',
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
      initialValue: discount ? String(discount.onceMax) : '1',
      rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
    },
    component: {
      type: FormType.InputAndCheck,
      option: {
        placeholder: '무제한 설정 999999999 입력',
        disabled: getLimit(form, 'onceMax')
      },
      option2: {
        key: 'onceLimit',
        text: '무제한',
        value: false,
        onChange: (value: boolean) => setLimit(form, 'onceMax', value ? '999999999' : '0')
      }
    }
  },
  {
    id: 'dayMax',
    label: '1일',
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
      initialValue: discount ? String(discount.dayMax) : '1',
      rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
    },
    component: {
      type: FormType.InputAndCheck,
      option: {
        placeholder: '무제한 설정 999999999 입력',
        disabled: getLimit(form, 'dayMax')
      },
      option2: {
        key: 'dayMaxLimit',
        text: '무제한',
        value: false,
        onChange: (value: boolean) => setLimit(form, 'dayMax', value ? '999999999' : '0')
      }
    }
  },
  {
    id: 'monthMax',
    label: '1월',
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
      initialValue: discount ? String(discount.monthMax) : '1',
      rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
    },
    component: {
      type: FormType.InputAndCheck,
      option: {
        placeholder: '무제한 설정 999999999 입력',
        disabled: getLimit(form, 'monthMax')
      },
      option2: {
        key: 'monthMaxLimit',
        text: '무제한',
        value: false,
        onChange: (value: boolean) => setLimit(form, 'monthMax', value ? '999999999' : '0')
      }
    }
  },
  {
    id: 'saleType',
    label: '판매타입',
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
      initialValue: discount ? discount.saleType : EPayType.FREE,
      rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
    },
    component: {
      type: FormType.Select,
      selectOptions: payTypeOpt
    }
  },
  {
    id: 'price',
    label: '판매가',
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
      initialValue: discount ? String(discount.price) : null,
      rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
    },
    component: {
      type: FormType.Input,
      option: {
        placeholder: '판매가격'
      }
    }
  },
  {
    id: 'extendYn',
    label: '연장',
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
      initialValue: discount ? discount.extendYn : EOnOff.ON,
      rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
    },
    component: {
      type: FormType.Select,
      option: {
        placeholder: '연장'
      },
      selectOptions: onOffSelectOpt
    }
  },
  {
    id: 'delYn',
    label: '활성',
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
      initialValue: discount ? discount.delYn : EDelYn.N,
      rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
    },
    component: {
      type: FormType.Select,
      selectOptions: delYnOpt
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
  }
];
