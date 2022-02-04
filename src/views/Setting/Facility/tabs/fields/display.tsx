import { IFormFieldConfig } from '@utils/form';
import { IDisplayInfoObj, IDisplayMsgObj } from '@models/display';
import { FormType } from '@/constants/form';
import {
  colorTypeOpt,
  delYnOpt,
  EColorType,
  EDelYn,
  ELineStatus,
  elineStatusOpt,
  EMessageClassType,
  EMessageTypeType,
  lineOpt,
  messageClassTypeOpt,
  messageTypeTypeOpt,
  orderOpt
} from '@/constants/list';

export function displayFields(display?: IDisplayMsgObj): IFormFieldConfig<keyof IDisplayMsgObj>[] {
  return [
    {
      id: 'messageClass',
      label: '메세지그룹',
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
        initialValue: display ? display.messageClass : EMessageClassType.IN,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: messageClassTypeOpt
      }
    },
    {
      id: 'messageType',
      label: '메세지타입',
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
        initialValue: display ? display.messageType : EMessageTypeType.NONMEMBER,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: messageTypeTypeOpt
      }
    },
    {
      id: 'lineNumber',
      label: '라인',
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
        initialValue: display ? display.lineNumber : 1,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: lineOpt
      }
    },
    {
      id: 'order',
      label: '순서',
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
        initialValue: display ? display.order : 1,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: orderOpt
      }
    },
    {
      id: 'colorCode',
      label: '컬러',
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
        initialValue: display ? display.colorCode : EColorType.C1,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: colorTypeOpt
      }
    },
    {
      id: 'messageDesc',
      label: '문구',
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
        initialValue: display ? display.messageDesc : null,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력해주세요.'
        }
      }
    },
    {
      id: 'delYn',
      label: '사용',
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
        initialValue: display ? display.delYn : EDelYn.N,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: delYnOpt.filter((d) => d.value !== EDelYn.ALL)
      }
    },
    {
      id: 'messageCode',
      label: 'messageCode',
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
        initialValue: display ? display.messageDesc : 'ALL'
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'sn',
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
        initialValue: display ? display.sn : null
      },
      component: {
        type: FormType.Input
      }
    }
  ];
}

export function flowSettingFields(
  displayInfo?: IDisplayInfoObj
): IFormFieldConfig<keyof IDisplayInfoObj>[] {
  return [
    {
      id: 'line1Status',
      label: '1번째 라인 설정',
      colProps: {
        xl: 24,
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
        initialValue: displayInfo ? displayInfo.line1Status : ELineStatus.FIX
      },
      component: {
        type: FormType.Select,
        selectOptions: elineStatusOpt
      }
    },
    {
      id: 'line2Status',
      label: '2번째 라인 설정',
      colProps: {
        xl: 24,
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
        initialValue: displayInfo ? displayInfo.line2Status : ELineStatus.FIX
      },
      component: {
        type: FormType.Select,
        selectOptions: elineStatusOpt
      }
    },
    {
      id: 'sn',
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
        initialValue: displayInfo ? displayInfo.sn : null
      },
      component: {
        type: FormType.Input
      }
    }
  ];
}
