import { IFormFieldConfig, ISelectOptions } from '@utils/form';
import { IBarcodeClassObj, IBarcodeObj } from '@models/barcode';
import { FormType } from '@/constants/form';
import { ICorpTicketClassObj } from '@models/corpTicketClass';
import { delYnOpt, EDelYn } from '@/constants/list';

export function BarcodeSettingFields(
  barcode?: IBarcodeObj | null
): IFormFieldConfig<keyof IBarcodeObj>[] {
  return [
    {
      id: 'startIndex',
      label: '시작위치',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 9,
          xs: 9,
          xl: 8
        },
        required: true,
        wrapperCol: {
          span: 15,
          xs: 15,
          xl: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: barcode ? barcode.startIndex : '',
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'endIndex',
      label: '끝위치',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 9,
          xs: 9,
          xl: 8
        },
        required: true,
        wrapperCol: {
          span: 15,
          xs: 15,
          xl: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: barcode ? barcode.endIndex : '',
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'decriptKey',
      label: '암호키',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 9,
          xs: 9,
          xl: 8
        },
        required: true,
        wrapperCol: {
          span: 15,
          xs: 15,
          xl: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: barcode ? barcode.decriptKey : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'sn',
      label: 'sn',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 9,
          xs: 9,
          xl: 8
        },
        required: true,
        wrapperCol: {
          span: 15,
          xs: 15,
          xl: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: barcode ? barcode.sn : ''
      },
      component: {
        type: FormType.Input
      }
    }
  ];
}

export function BarcodeClassFields(
  barcodeClass?: IBarcodeClassObj,
  discountSelectClasses?: ISelectOptions[]
): IFormFieldConfig<keyof IBarcodeClassObj>[] {
  return [
    {
      id: 'start',
      label: '적용시작',
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
        initialValue: barcodeClass ? barcodeClass.start : null,
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '적용범위를 입력하세요'
        }
      }
    },
    {
      id: 'end',
      label: '적용끝',
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
        initialValue: barcodeClass ? barcodeClass.end : null,
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '적용범위를 입력하세요'
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
        initialValue: barcodeClass ? String(barcodeClass.discountClassSn) : null,
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
        initialValue: barcodeClass ? barcodeClass.delYn : EDelYn.N,
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: delYnOpt.filter((d) => d.value !== EDelYn.ALL)
      }
    },
    {
      id: 'sn',
      fieldOption: {
        initialValue: barcodeClass ? barcodeClass.sn : null
      },
      component: {
        type: FormType.Input
      }
    }
  ];
}
