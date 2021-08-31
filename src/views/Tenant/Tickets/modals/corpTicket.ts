import { ICorpTicketAddObj, ICorpTicketSummaryObj } from '@models/corpTicketClass';
import { IFormFieldConfig, ISelectOptions } from '@utils/form';
import { FormType } from '@/constants/form';

export function corpTicketAddFields(
  selectCorpTicketClass: ISelectOptions[],
  corpTicketSummary?: ICorpTicketSummaryObj
): IFormFieldConfig<keyof ICorpTicketAddObj>[] {
  return [
    {
      id: 'corpName',
      label: '입주사명',
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
        initialValue: corpTicketSummary ? corpTicketSummary.corp.corpName : null
      },
      component: {
        type: FormType.Input,
        option: {
          disabled: true
        }
      }
    },
    {
      id: 'corpTicketClassSn',
      label: '할인',
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
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: selectCorpTicketClass
      }
    },
    {
      id: 'cnt',
      label: '적용수량',
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
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '적용수량'
        }
      }
    },
    {
      id: 'corpSn',
      label: 'sn',
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
        initialValue: corpTicketSummary ? corpTicketSummary.corp.sn : null
      },
      component: {
        type: FormType.Input
      }
    }
  ];
}
