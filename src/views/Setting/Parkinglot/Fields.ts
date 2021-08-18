import { IFormFieldConfig } from '@utils/form';
import { IParkinglotObj, Space } from '@models/parkinglot';
import { FormType } from '@/constants/form';
import {
  cityOpt,
  EStatus,
  externalSvrTypeOpt,
  payTypeOpt,
  radioSelectOpt,
  vehicleDayOpt,
  VisitorExternalTypeOpt
} from '@/constants/list';
import { parkinglotStore } from '@/store/parkinglotStore';

export function ParkinglotSettingFields(
  visitorExternalKey: string | null | undefined,
  visitorExternal: string | null | undefined,
  space: Space | null | undefined,
  parkinglot?: IParkinglotObj | null,
  onSpaceSettingModal?: () => void,
  offSpaceSettingModal?: () => void,
  onVisitorExternalModal?: () => void,
  offVisitorExternalModal?: () => void
): IFormFieldConfig<keyof IParkinglotObj>[] {
  return [
    {
      id: 'siteid',
      label: '주차장 ID',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
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
        initialValue: parkinglot ? parkinglot.siteid : '',
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
      id: 'sitename',
      label: '주차장명',
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
        initialValue: parkinglot ? parkinglot.sitename : '',
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
      id: 'ceoname',
      label: '대표자명',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
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
        initialValue: parkinglot ? parkinglot.ceoname : '',
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
      id: 'city',
      label: '주차장 주소(도시)',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
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
        initialValue: parkinglot ? parkinglot.city : '',
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: '입력하세요'
        },
        selectOptions: cityOpt
      }
    },
    {
      id: 'address',
      label: '주차장 주소',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
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
        initialValue: parkinglot ? parkinglot.address : '',
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
      id: 'saleType',
      label: '주차장 과금운영',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
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
        initialValue: parkinglot ? parkinglot.saleType : '',
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: '입력하세요'
        },
        selectOptions: payTypeOpt
      }
    },
    {
      id: 'vehicleDayOption',
      label: '차량요일제',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
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
        initialValue: parkinglot ? parkinglot.vehicleDayOption : '',
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: '입력하세요'
        },
        selectOptions: vehicleDayOpt
      }
    },
    {
      id: 'saupno',
      label: '사업자번호',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
          xs: 9,
          xl: 8
        },
        wrapperCol: {
          span: 15,
          xs: 15,
          xl: 15
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
    },
    {
      id: 'tel',
      label: '대표 전화번호',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
          xs: 9,
          xl: 8
        },
        wrapperCol: {
          span: 15,
          xs: 15,
          xl: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: parkinglot ? parkinglot.tel : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'externalSvr',
      label: '통합관제',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
          xs: 9,
          xl: 8
        },
        wrapperCol: {
          span: 15,
          xs: 15,
          xl: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: parkinglot ? parkinglot.externalSvr : ''
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: '입력하세요'
        },
        selectOptions: externalSvrTypeOpt
      }
    },
    {
      id: 'ip',
      label: '주차장 IP',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
          xs: 9,
          xl: 8
        },
        wrapperCol: {
          span: 15,
          xs: 15,
          xl: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: parkinglot ? parkinglot.ip : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'rcsParkId',
      label: 'PARKID',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
          xs: 9,
          xl: 8
        },
        wrapperCol: {
          span: 15,
          xs: 15,
          xl: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: parkinglot ? parkinglot.rcsParkId : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'visitorExternal',
      label: '방문차량(정기권)외부연계',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
          xs: 9,
          xl: 8
        },
        wrapperCol: {
          span: 15,
          xs: 15,
          xl: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: parkinglot?.visitorExternal ? EStatus.On : EStatus.Off
      },
      component: {
        type: FormType.Radio,
        option: {
          placeholder: '입력하세요',
          open: onVisitorExternalModal,
          close: offVisitorExternalModal,
          note:
            visitorExternal !== null &&
            visitorExternal !== undefined &&
            visitorExternalKey !== undefined &&
            visitorExternalKey !== null
              ? `연계:${visitorExternal}, 코드:${visitorExternalKey}`
              : null
        },
        selectOptions: radioSelectOpt
      }
    },
    {
      id: 'space',
      label: '만차제어',
      colProps: {
        span: 24,
        xs: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
          xs: 9,
          xl: 8
        },
        wrapperCol: {
          span: 15,
          xs: 15,
          xl: 15
        },
        children: null
      },
      fieldOption: {
        initialValue: parkinglot?.space ? EStatus.On : EStatus.Off
      },
      component: {
        type: FormType.Radio,
        option: {
          placeholder: '입력하세요',
          open: onSpaceSettingModal,
          close: offSpaceSettingModal,
          note: space ? `게이트:${space.gateGroupId}, 공간:${space.space}` : null
        },
        selectOptions: radioSelectOpt
      }
    }
  ];
}

export function ParkinglotSpaceSettingFields(
  space?: Space,
  gates?: any[],
  gateGroups?: any[]
): IFormFieldConfig<keyof Space>[] {
  {
    return [
      {
        id: 'gateGroupId',
        label: '게이트그룹ID',
        colProps: {
          span: 24,
          xs: 24,
          xl: 24
        },
        formItemProps: {
          labelCol: {
            span: 9,
            xs: 9,
            xl: 9
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
          initialValue: space ? space.gateGroupId : ''
        },
        component: {
          type: FormType.Select,
          option: {
            placeholder: '입력하세요'
          },
          selectOptions: gateGroups
        }
      },
      {
        id: 'space',
        label: '주차면수',
        colProps: {
          span: 24,
          xs: 24,
          xl: 24
        },
        formItemProps: {
          labelCol: {
            span: 9,
            xs: 9,
            xl: 9
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
          initialValue: space ? space.space : ''
        },
        component: {
          type: FormType.Input
        }
      }
    ];
  }
}

export function ParkingVisitorExternalFields(
  visitorExternal?: string | null,
  visitorExternalKey?: string | null
): IFormFieldConfig<keyof IParkinglotObj>[] {
  {
    return [
      {
        id: 'visitorExternal',
        label: '연계 모듈',
        colProps: {
          span: 24,
          xs: 24,
          xl: 24
        },
        formItemProps: {
          labelCol: {
            span: 9,
            xs: 9,
            xl: 9
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
          initialValue: visitorExternal ? visitorExternal : null
        },
        component: {
          type: FormType.Select,
          selectOptions: VisitorExternalTypeOpt
        }
      },
      {
        id: 'visitorExternalKey',
        label: '주차장 코드',
        colProps: {
          span: 24,
          xs: 24,
          xl: 24
        },
        formItemProps: {
          labelCol: {
            span: 9,
            xs: 9,
            xl: 9
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
          initialValue: visitorExternalKey ? visitorExternalKey : null
        },
        component: {
          type: FormType.Input
        }
      }
    ];
  }
}
