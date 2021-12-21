import { IFareBasicObj } from '@models/fare';
import { IFormFieldConfig } from '@utils/form';
import { FormType } from '@/constants/form';

export function getFareBasicFields(
  fareBasic?: IFareBasicObj | null
): IFormFieldConfig<keyof IFareBasicObj>[] {
  return [
    {
      id: 'sn',
      label: 'sn',
      hidden: true,
      fieldOption: {
        initialValue: fareBasic ? fareBasic.sn : ''
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'serviceTime',
      label: '서비스타임',
      colProps: {
        span: 24
      },
      formItemProps: {
        labelCol: {
          span: 10
        },
        wrapperCol: {
          span: 10
        },
        children: null
      },
      fieldOption: {
        initialValue: fareBasic ? fareBasic.serviceTime : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'regTime',
      label: '레그타임',
      colProps: {
        span: 24
      },
      formItemProps: {
        labelCol: {
          span: 10
        },
        wrapperCol: {
          span: 10
        },
        children: null
      },
      fieldOption: {
        initialValue: fareBasic ? fareBasic.regTime : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'ticketTime',
      label: '할인권타임',
      colProps: {
        span: 24
      },
      formItemProps: {
        labelCol: {
          span: 10
        },
        wrapperCol: {
          span: 10
        },
        children: null
      },
      fieldOption: {
        initialValue: fareBasic ? fareBasic.ticketTime : 0
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'dayMaxAmt',
      label: '일최대요금',
      colProps: {
        span: 24
      },
      formItemProps: {
        labelCol: {
          span: 10
        },
        wrapperCol: {
          span: 10
        },
        children: null
      },
      fieldOption: {
        initialValue: fareBasic ? fareBasic.dayMaxAmt : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    }
  ];
}
