import { FormType } from '@/constants/form';
import {
  delYnOpt,
  EDelYn,
  ESearchLable,
  ETicketSearchType,
  ETicketType,
  EVehicleType,
  searchLableOpt,
  ticketSearchTypeOpt,
  ticketTypeOpt,
  useOrUnuseOpt,
  vehicleTypeOpt
} from '@/constants/list';
import { ITicketObj, ITicketSelectReq } from '@/models/ticket';
import { corpStore } from '@/store/corpStore';
import { localeStore } from '@/store/localeStore';
import {
  disabledThreeMonth,
  formColProps16Config,
  IFormFieldConfig,
  ISelectOptions
} from '@/utils/form';
import moment from 'moment';

const regisDateRangeConfig = {
  rules: [
    {
      type: 'array',
      required: false,
      message: localeStore.localeObj['alert.select.time'] || '시간을 선택하세요'
    }
  ],
  initialValue: [moment(new Date()).subtract(3, 'days'), moment(new Date())]
};

const regisMonthRangeConfig = {
  rules: [
    {
      type: 'array',
      required: false,
      message: localeStore.localeObj['alert.select.time'] || '시간을 선택하세요'
    }
  ],
  initialValue: [moment(new Date()).subtract(3, 'month'), moment(new Date())]
};

export function searchTicketFields(): IFormFieldConfig<keyof ITicketSelectReq>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'ticketType',
      label: '종류',
      colProps: {
        span: 4,
        xs: 24,
        md: 24,
        xl: 4
      },
      formItemProps: {
        labelCol: {
          span: 5,
          xl: 5,
          md: 5,
          xs: 5
        },
        wrapperCol: {
          span: 15,
          xs: 19,
          md: 15,
          xl: 15
        }
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: localeObj['label.choose'] || '선택해주세요',
          allowClear: true
        },
        selectOptions: ticketTypeOpt.filter(
          (d) =>
            d.value !== ETicketType.NORMAL &&
            d.value !== ETicketType.UNRECOGNIZED &&
            d.value !== ETicketType.DISCOUNT
        )
      }
    },
    {
      id: 'delYn',
      label: '사용',
      colProps: {
        span: 4,
        xs: 24,
        md: 24,
        xl: 4
      },
      formItemProps: {
        labelCol: {
          span: 5,
          xl: 5,
          md: 5,
          xs: 5
        },
        wrapperCol: {
          span: 15,
          xs: 19,
          md: 15,
          xl: 15
        }
      },
      fieldOption: {
        initialValue: EDelYn.N
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: localeObj['label.choose'] || '선택해주세요',
          allowClear: true
        },
        selectOptions: useOrUnuseOpt
      }
    },
    {
      id: 'dateType',
      label: '조회기준',
      formItemProps: {
        labelCol: {
          span: 5,
          xl: 5,
          md: 5,
          xs: 5
        },
        wrapperCol: {
          span: 15,
          xs: 19,
          md: 19,
          xl: 19
        }
      },
      fieldOption: {
        initialValue: ETicketSearchType.VALIDATE
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: localeObj['label.choose'] || '선택해주세요',
          allowClear: true
        },
        selectOptions: ticketSearchTypeOpt
      },
      formSubItemProps: {
        id: 'createTm',
        label: '조회기간',
        component: {
          type: FormType.RangePicker,
          option: {
            placeholder: [
              localeObj['label.startDate'] || '시작일',
              localeObj['label.endDate'] || '종료일'
            ],
            allowClear: true,
            disabledDate: disabledThreeMonth
          }
        },
        fieldOption: regisMonthRangeConfig
      }
    },
    {
      id: 'searchLabel',
      label: '차량번호',
      formItemProps: {
        labelCol: {
          span: 5,
          xl: 5,
          md: 5,
          xs: 5
        },
        wrapperCol: {
          span: 15,
          xs: 19,
          md: 15,
          xl: 15
        }
      },
      fieldOption: {
        initialValue: ESearchLable.CARNUM
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: localeObj['label.choose'] || '선택해주세요',
          allowClear: true
        },
        selectOptions: searchLableOpt
      },
      formSubItemProps: {
        id: 'searchText',
        component: {
          type: FormType.Input,
          option: {
            placeholder: '입력하세요.'
          }
        }
      }
    }
  ];
}

export function NewTicketFields(
  ticket?: ITicketObj,
  ticketClasses?: ISelectOptions[]
): IFormFieldConfig<keyof ITicketObj>[] {
  const { corpSelectList } = corpStore;
  return [
    {
      id: 'ticketType',
      label: '상품타입',
      colProps: {
        span: 8,
        xs: 24,
        md: 8,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        },
        children: null
      },
      fieldOption: {
        initialValue: ticket ? ticket.ticketType : ETicketType.SEASONTICKET
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: '선택하세요'
        },
        selectOptions: ticketTypeOpt.filter(
          (d) =>
            d.value === ETicketType.SEASONTICKET ||
            d.value === ETicketType.VISITTICKET ||
            d.value === ETicketType.FREETICKET
        )
      }
    },
    {
      id: 'ticketSn',
      label: '정기권정보',
      colProps: {
        span: 8,
        xs: 24,
        md: 8,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        },
        children: null
      },
      fieldOption: {
        initialValue: ticket?.ticketSn ? ticket.ticketSn : null
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: '선택하세요'
        },
        selectOptions: ticketClasses
      }
    },
    {
      id: 'vehicleType',
      label: '차량타입',
      colProps: {
        span: 8,
        xs: 24,
        md: 8,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        },
        children: null
      },
      fieldOption: {
        initialValue: ticket ? ticket.vehicleType : EVehicleType.SMALL
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: '선택하세요'
        },
        selectOptions: vehicleTypeOpt
      }
    },
    {
      id: 'vehicleNo',
      label: '차량번호',
      colProps: {
        span: 8,
        xs: 24,
        md: 8,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 4,
          xs: 8,
          xl: 8
        },
        wrapperCol: {
          span: 18,
          xs: 12,
          xl: 12
        },
        required: true
      },
      fieldOption: {
        initialValue: ticket ? ticket.vehicleNo : null,
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'effectDate',
      label: '시작일',
      colProps: {
        span: 8,
        xs: 24,
        md: 6,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        },
        children: null
      },
      fieldOption: {
        initialValue: ticket ? moment(ticket.effectDate) : moment(new Date())
      },
      component: {
        type: FormType.DatePicker,
        option: {
          format: 'YYYY-MM-DD',
          showTime: false
          //disabledDate: disabledThreeMonth
        }
      }
    },
    {
      id: 'expireDate',
      label: '종료일',
      colProps: {
        span: 8,
        xs: 24,
        md: 6,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        },
        children: null
      },
      fieldOption: {
        initialValue: ticket ? moment(ticket.expireDate) : moment('9999-12-31')
      },
      component: {
        type: FormType.DatePicker,
        option: {
          format: 'YYYY-MM-DD',
          showTime: false
          //disabledDate: disabledThreeMonth
        }
      }
    },
    {
      id: 'name',
      label: '이름',
      colProps: {
        span: 8,
        xs: 24,
        md: 6,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        },
        children: null
      },
      fieldOption: {
        initialValue: ticket ? ticket.name : null
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'tel',
      label: '전화번호',
      colProps: {
        span: 8,
        xs: 24,
        md: 6,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        },
        children: null
      },
      fieldOption: {
        initialValue: ticket ? ticket.tel : null
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'vehiclekind',
      label: '차량정보',
      colProps: {
        span: 8,
        xs: 24,
        md: 6,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        },
        children: null
      },
      fieldOption: {
        initialValue: ticket ? ticket.vehiclekind : null
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'corpSn',
      label: '입주사',
      colProps: {
        span: 8,
        xs: 24,
        md: 6,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        },
        children: null
      },
      fieldOption: {
        initialValue: ticket ? ticket.corpSn : corpSelectList[0].value
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: '선택하세요'
        },
        selectOptions: corpSelectList
      }
    },
    {
      id: 'etc',
      label: '정보1',
      colProps: {
        span: 8,
        xs: 24,
        md: 6,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        },
        children: null
      },
      fieldOption: {
        initialValue: ticket ? ticket.etc : null
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'etc1',
      label: '정보2',
      colProps: {
        span: 8,
        xs: 24,
        md: 6,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        },
        children: null
      },
      fieldOption: {
        initialValue: ticket ? ticket.etc1 : null
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'delYn',
      label: '사용여부',
      colProps: {
        span: 8,
        xs: 24,
        md: 6,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 8
        },
        wrapperCol: {
          span: 12
        },
        children: null
      },
      fieldOption: {
        initialValue: ticket ? ticket.delYn : EDelYn.N
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: '선택하세요'
        },
        selectOptions: delYnOpt.filter((d) => d.value !== EDelYn.ALL)
      }
    },
    {
      id: 'sn',
      ...formColProps16Config,
      fieldOption: {
        initialValue: ticket ? ticket.sn : null
      },
      component: {
        type: FormType.Input
      }
    }
  ];
}
