import { IFormFieldConfig } from '@utils/form';
import { IParkinglotObj } from '@models/parkinglot';
import { FormType } from '@/constants/form';

export function ParkinglotSettingFields(
  parkinglot?: IParkinglotObj | null
): IFormFieldConfig<keyof IParkinglotObj>[] {
  return [
    {
      id: 'siteid',
      label: '주차장 ID',
      colProps: {
        span: 24
      },
      formItemProps: {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 10
        },
        children: null
      },
      fieldOption: {
        initialValue: parkinglot ? parkinglot.siteid : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'sitename',
      label: '주차장명',
      colProps: {
        span: 24
      },
      formItemProps: {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 10
        },
        children: null
      },
      fieldOption: {
        initialValue: parkinglot ? parkinglot.sitename : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'ceoname',
      label: '대표자명',
      colProps: {
        span: 24
      },
      formItemProps: {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 10
        },
        children: null
      },
      fieldOption: {
        initialValue: parkinglot ? parkinglot.ceoname : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'saupno',
      label: '사업자번호',
      colProps: {
        span: 24
      },
      formItemProps: {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 10
        },
        children: null
      },
      fieldOption: {
        initialValue: parkinglot ? parkinglot.saupno : ''
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
