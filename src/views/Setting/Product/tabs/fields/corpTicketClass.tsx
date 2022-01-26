import { ICorpTicketClassObj } from '@models/corpTicketClass';
import { IFormFieldConfig, ISelectOptions } from '@utils/form';
import { FormType } from '@/constants/form';
import {
  dayTYpeOpt,
  delYnOpt,
  EDelYn,
  EOnOff,
  EPayType,
  ETicketApplyTargetTyoe,
  onOffSelectOpt,
  payTypeOpt,
  ticketApplyTargetTypeOpt
} from '@/constants/list';
import { WrappedFormUtils } from '@ant-design/compatible/lib/form/Form';

function setLimit(form: WrappedFormUtils<any>, fieldName: string, value: string) {
  //console.log('setLimit', fieldName, value);
  form.setFieldsValue({ [fieldName]: value });
}

function getLimit(form: WrappedFormUtils<any>, fieldName: string) {
  //console.log('getLimit', fieldName, form.getFieldValue(fieldName));
  return (
    form.getFieldValue(fieldName) === '999999999' || form.getFieldValue(fieldName) === '무제한'
  );
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
    id: 'applyTarget',
    label: '적용기준',
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
      initialValue: discount ? discount.applyTarget : ETicketApplyTargetTyoe.NOW,
      rules: [{ required: true, message: '필수 입력값 입니다' }]
    },
    component: {
      type: FormType.Select,
      selectOptions: ticketApplyTargetTypeOpt
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
      initialValue: discount ? discount.week : ''
    },
    component: {
      type: FormType.CheckGroup,
      selectOptions: dayTYpeOpt
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
      initialValue: discount
        ? discount.onceMax === 999999999
          ? '무제한'
          : String(discount.onceMax)
        : 1,
      rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
    },
    component: {
      type: FormType.Input,
      option: {
        // placeholder: '무제한 설정 999999999 입력',
        disabled:
          form.getFieldValue('onceMax') === '999999999' ||
          form.getFieldValue('onceMax') === '무제한',
        onChange: (e: any) => {
          e.target.value === '999999999' ? '무제한' : e.target.value;
        },
        col: 12
      }
    },
    formSubItemProps: {
      id: 'onceLimit',
      label: '무제한',
      component: {
        type: FormType.Checkbox,
        option: {
          text: '무제한',
          defaultChecked:
            form.getFieldValue('onceMax') === '999999999' ||
            form.getFieldValue('onceMax') === '무제한', //!getLimit(form, 'onceMax'),
          onChange: (e: any) =>
            form.setFieldsValue({ ['onceMax']: e.target.checked ? '999999999' : '1' })
        }
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
      initialValue: discount
        ? discount.dayMax === 999999999
          ? '무제한'
          : String(discount.dayMax)
        : 1,
      rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
    },
    component: {
      type: FormType.Input,
      option: {
        // placeholder: '무제한 설정 999999999 입력',
        disabled:
          form.getFieldValue('dayMax') === '999999999' || form.getFieldValue('dayMax') === '무제한',
        onChange: (e: any) => {
          e.target.value === '999999999' ? '무제한' : e.target.value;
        },
        col: 12
      }
    },
    formSubItemProps: {
      id: 'dayMaxLimit',
      label: '무제한',
      component: {
        type: FormType.Checkbox,
        option: {
          text: '무제한',
          // checked: !getLimit(form, 'dayMax'),
          defaultChecked:
            form.getFieldValue('dayMax') === '999999999' ||
            form.getFieldValue('dayMax') === '무제한',
          onChange: (e: any) =>
            form.setFieldsValue({ ['dayMax']: e.target.checked ? '999999999' : '1' })
        }
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
      initialValue: discount
        ? discount.monthMax === 999999999
          ? '무제한'
          : String(discount.monthMax)
        : 1,
      rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
    },
    component: {
      type: FormType.Input,
      option: {
        // placeholder: '무제한 설정 999999999 입력',
        disabled:
          form.getFieldValue('monthMax') === '999999999' ||
          form.getFieldValue('monthMax') === '무제한',
        onChange: (e: any) => {
          e.target.value === '999999999' ? '무제한' : e.target.value;
        },
        col: 12
      }
    },
    formSubItemProps: {
      id: 'monthMaxLimit',
      label: '무제한',
      component: {
        type: FormType.Checkbox,
        option: {
          text: '무제한',
          defaultChecked:
            form.getFieldValue('monthMax') === '999999999' ||
            form.getFieldValue('monthMax') === '무제한',
          onChange: (e: any) =>
            form.setFieldsValue({ ['monthMax']: e.target.checked ? '999999999' : '1' })
        }
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
