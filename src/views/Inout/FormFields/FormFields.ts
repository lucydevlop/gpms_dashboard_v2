import { localeStore } from '@store/localeStore';
import {
  disabledDateAfterToday,
  formColProps16Config,
  formColProps6Config,
  IFormFieldConfig
} from '@/utils/form';
import { IInoutObj, IInoutSelectReq } from '@models/inout';
import { EInoutType, ETicketType, inoutSearchDateTypeOpt, ticketTypeOpt } from '@/constants/list';
import { FormType } from '@/constants/form';
import { datePickerFormat } from '@/constants';
import moment from 'moment';
import { conversionDateTime } from '@/utils/conversion';

const regisDateRangeConfig = {
  rules: [
    {
      type: 'array',
      required: false,
      message: localeStore.localeObj['alert.select.time'] || '시간을 선택하세요'
    }
  ],
  format: datePickerFormat,
  initialValue: [moment(new Date()).subtract(3, 'days'), moment(new Date())]
};

export function searchInoutFields(): IFormFieldConfig<keyof IInoutSelectReq>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'dateType',
      label: '조회기준',
      fieldOption: {
        initialValue: EInoutType.IN
      },
      formItemProps: {
        labelCol: {
          span: 5,
          xl: 5,
          md: 5,
          xs: 5
        },
        wrapperCol: {
          span: 19,
          xs: 19,
          md: 19,
          xl: 19
        }
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: localeObj['label.choose'] || '선택해주세요',
          allowClear: true
        },
        selectOptions: inoutSearchDateTypeOpt
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
            disabledDate: disabledDateAfterToday
          }
        },
        fieldOption: regisDateRangeConfig
      }
    },
    {
      id: 'vehicleNo',
      label: '차량번호',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 5,
          xs: 5
        },
        wrapperCol: {
          xl: 10,
          xs: 10
        }
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

export function newInoutFields(gates: any[]): IFormFieldConfig<keyof IInoutObj>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'parkinSn',
      label: '입차 SEQ',
      hidden: true,
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: null
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '선택하세요'
        }
      }
    },
    {
      id: 'parkcartype',
      label: '차량타입',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: ETicketType.NORMAL
      },
      component: {
        type: FormType.Select,
        selectOptions: ticketTypeOpt
      }
    },
    {
      id: 'vehicleNo',
      label: '차량번호',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: null,
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'inGateId',
      label: '입차게이트',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: gates[0]!!.value
      },
      component: {
        type: FormType.Select,
        selectOptions: gates
      }
    },
    {
      id: 'inDate',
      label: '입차날짜',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: moment(new Date())
      },
      component: {
        type: FormType.DatePicker,
        option: {
          format: 'YYYY-MM-DD HH:mm',
          showTime: false,
          disabledDate: disabledDateAfterToday
        }
      }
    },
    {
      id: 'memo',
      label: '메모',
      colProps: {
        xl: 24,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 4,
          xs: 8
        },
        wrapperCol: {
          xl: 20,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: null
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'type',
      fieldOption: {
        initialValue: EInoutType.IN
      },
      component: {
        type: FormType.Select
      }
    }
  ];
}

export function newInoutDetailFileds(
  inout?: IInoutObj,
  gates?: any[]
): IFormFieldConfig<keyof IInoutObj>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'parkinSn',
      label: '입차 SEQ',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: inout ? inout.parkinSn : null
      },
      hidden: true,
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'parkcartype',
      label: '차량타입',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: inout ? inout.parkcartype : ETicketType.NORMAL
      },
      component: {
        type: FormType.Select,
        selectOptions: ticketTypeOpt
      }
    },
    {
      id: 'vehicleNo',
      label: '차량번호',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: inout ? inout.vehicleNo : null
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'inGateId',
      label: '입차게이트',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: inout ? inout.inGateId : gates!![0].gateId
      },
      component: {
        type: FormType.Select,
        selectOptions: gates
      }
    },
    {
      id: 'inDate',
      label: '입차날짜',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: inout ? moment(inout.inDate) : moment(new Date())
      },
      component: {
        type: FormType.DatePicker,
        option: {
          format: 'YYYY-MM-DD HH:mm',
          showTime: false
        }
      }
    },
    {
      id: 'outGateId',
      label: '출차게이트',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 12,
          xs: 12
        },
        children: null
      },
      fieldOption: {
        initialValue: inout?.outGateId ? inout.outGateId : gates!![0].gateId
      },
      component: {
        type: FormType.Select,
        selectOptions: gates
      }
    },
    {
      id: 'outDate',
      label: '출차날짜',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: inout?.outDate ? moment(inout.outDate) : ''
      },
      component: {
        type: FormType.DatePicker,
        option: {
          format: 'YYYY-MM-DD HH:mm',
          showTime: false
        }
      }
    },
    {
      id: 'memo',
      label: '메모',
      colProps: {
        xl: 24,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 4,
          xs: 8
        },
        wrapperCol: {
          xl: 20,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: inout ? inout.memo : null
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'type',
      fieldOption: {
        initialValue: EInoutType.IN
      },
      component: {
        type: FormType.Select
      }
    },
    {
      id: 'parkinSn',
      label: '입차 SEQ',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 8
        },
        wrapperCol: {
          xl: 16,
          xs: 16
        },
        children: null
      },
      fieldOption: {
        initialValue: inout ? inout.parkinSn : null
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '선택하세요'
        }
      }
    }
  ];
}
