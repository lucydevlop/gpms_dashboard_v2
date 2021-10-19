import { disabledDateAfterToday, disabledDateBeforToday, IFormFieldConfig } from '@utils/form';
import { IVisitorObj, IVisitorSearchReq } from '@models/visitor';
import { FormType } from '@/constants/form';
import { localeStore } from '@store/localeStore';
import moment from 'moment';
import {
  ETicketSearchType,
  ETicketType,
  ticketSearchTypeOpt,
  useOrUnuseOpt
} from '@/constants/list';
import { datePickerFormat } from '@/constants';

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

export function VisitorRegisterFields(
  visitor?: IVisitorObj
): IFormFieldConfig<keyof IVisitorObj>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'vehicleNo',
      label: '차량번호',
      fieldOption: {
        initialValue: visitor ? visitor.vehicleNo : null,
        rules: [{ required: true, whitespace: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '차량번호를 입력하세요 (필수)',
          name: 'vehicleNo'
        }
      },
      colProps: {
        xl: 24,
        md: 24,
        lg: 24,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 10
        },
        wrapperCol: {
          xl: 16,
          xs: 14
        }
      }
    },
    {
      id: 'tel',
      label: '전화번호',
      fieldOption: {
        initialValue: visitor ? visitor.tel : null
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: "휴대폰 번호를'-'포함 입력하세요 (선택)"
        }
      },
      colProps: {
        xl: 24,
        md: 24,
        lg: 24,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 10
        },
        wrapperCol: {
          xl: 16,
          xs: 14
        }
      }
    },
    {
      id: 'etc',
      label: '메모',
      fieldOption: {
        initialValue: visitor ? visitor.etc : null
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '메모를 입력하세요 (선택)'
        }
      },
      colProps: {
        xl: 24,
        md: 24,
        lg: 24,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 8,
          xs: 10
        },
        wrapperCol: {
          xl: 16,
          xs: 14
        }
      }
    },
    {
      id: 'ticketType',
      fieldOption: {
        initialValue: ETicketType.VISITTICKET
      },
      component: {
        type: FormType.Input
      },
      colProps: {
        xl: 12
      }
    }
  ];
}

export function VisitorRegisterDateFields(): IFormFieldConfig<keyof IVisitorObj>[] {
  return [
    {
      id: 'effectDate',
      label: '방문예정일',
      colProps: {
        xl: 24,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          xl: 13,
          xs: 13
        },
        wrapperCol: {
          xl: 11,
          xs: 11
        }
      },
      fieldOption: {
        initialValue: moment(new Date())
      },
      component: {
        type: FormType.DatePicker,
        option: {
          format: 'YYYY-MM-DD',
          showTime: false,
          disabledDate: disabledDateBeforToday
        }
      }
    }
  ];
}

export function SearchVisitorFields(): IFormFieldConfig<keyof IVisitorSearchReq>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'dateType',
      label: '',
      colProps: {
        xl: 12,
        xs: 24
      },
      formItemProps: {
        labelCol: {
          span: 0,
          xl: 0,
          md: 0,
          xs: 0
        },
        wrapperCol: {
          span: 15,
          xs: 24,
          md: 24,
          xl: 24
        }
      },
      fieldOption: {
        initialValue: ETicketSearchType.VALIDATE
      },
      component: {
        type: FormType.Select,
        selectOptions: ticketSearchTypeOpt,
        option: {
          col: 0
        }
      },
      formSubItemProps: {
        id: 'createTm',
        component: {
          type: FormType.RangePicker,
          option: {
            placeholder: [
              localeObj['label.startDate'] || '선택해주세요',
              localeObj['label.endDate'] || '종료일'
            ],
            allowClear: true
          }
        },
        fieldOption: regisDateRangeConfig
      }
    },
    {
      id: 'searchText',
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
          xl: 19,
          xs: 19
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
/*

export function UpdateVisitorModalFields(
  visitor?: IVisitorObj
): IFormFieldConfig<keyof IVisitorObj>[] {
  const { localeObj } = localeStore;
  return [
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
          xl: 19,
          xs: 19
        }
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'etc',
      label: '메모',
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
          xl: 19,
          xs: 19
        }
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'effectDate',
      label: '시작일자',
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
          xl: 19,
          xs: 19
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
*/
