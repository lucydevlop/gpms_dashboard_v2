import { ITicketClassObj } from '@models/ticketClass';
import { IFormFieldConfig } from '@utils/form';
import {
  dayTYpeOpt,
  delYnOpt,
  EDelYn,
  EPeriodType,
  ETicketAplyType,
  ETicketType,
  EVehicleType,
  periodTypeOpt,
  ticketAplyTypeOpt,
  ticketTypeOpt,
  useYnOpt,
  vehicleTypeOpt
} from '@/constants/list';
import { FormType } from '@/constants/form';
import moment from 'moment';
import { localeStore } from '@store/localeStore';

export function ticketClassFields(
  ticketClass?: ITicketClassObj
): IFormFieldConfig<keyof ITicketClassObj>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'ticketType',
      label: '상품타입',
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
        initialValue: ticketClass ? ticketClass.ticketType : ETicketType.SEASONTICKET,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: ticketTypeOpt.filter(
          (d) =>
            d.value !== ETicketType.NORMAL &&
            d.value !== ETicketType.UNRECOGNIZED &&
            d.value !== ETicketType.DISCOUNT
        )
      }
    },
    {
      id: 'ticketName',
      label: '상품명',
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
        initialValue: ticketClass ? ticketClass.ticketName : '',
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력해주세요.'
        }
      }
    },
    // {
    //   id: 'rangeType',
    //   label: '적용일',
    //   colProps: {
    //     xl: 12,
    //     xs: 24
    //   },
    //   formItemProps: {
    //     labelCol: {
    //       xl: 9,
    //       xs: 9
    //     },
    //     wrapperCol: {
    //       xl: 15,
    //       xs: 15
    //     },
    //     children: null
    //   },
    //   fieldOption: {
    //     initialValue: ticketClass ? ticketClass.rangeType : EDayRangeType.ALL,
    //     rules: [{ required: true, message: '필수 입력값 입니다' }]
    //   },
    //   component: {
    //     type: FormType.Select,
    //     selectOptions: dayRangeTypeOpt
    //   }
    // },
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
        initialValue: ticketClass ? ticketClass.week : ''
      },
      component: {
        type: FormType.CheckGroup,
        selectOptions: dayTYpeOpt
      }
    },
    {
      id: 'aplyType',
      label: '적용타입',
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
        initialValue: ticketClass ? ticketClass.aplyType : ETicketAplyType.FULL,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: ticketAplyTypeOpt
      }
    },
    {
      id: 'timeRange',
      label: '반영시간',
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
        rules: [{ type: 'array', required: true, whitespace: true, message: '필수 입력 값입니다' }],
        initialValue: ticketClass
          ? [moment(ticketClass.startTime, 'HH:mm'), moment(ticketClass.endTime, 'HH:mm')]
          : ''
      },
      component: {
        type: FormType.TimePicker,
        option: {
          placeholder: [
            localeObj['label.startTime'] || '시작시간',
            localeObj['label.endTime'] || '종료시간'
          ],
          allowClear: true,
          order: false
        }
      }
    },
    {
      id: 'vehicleType',
      label: '차량타입',
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
        initialValue: ticketClass ? ticketClass.vehicleType : EVehicleType.SMALL,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: vehicleTypeOpt
      }
    },
    {
      id: 'price',
      label: '가격',
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
        initialValue: ticketClass ? ticketClass.price : 0,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'periodNumber',
      label: '기간',
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
        initialValue: ticketClass ? ticketClass.period?.number : 0,
        rules: [{ required: true, message: '필수 입력 값입니다' }]
      },
      component: {
        type: FormType.InputNumber,
        option: {
          col: 0
        }
      },
      formSubItemProps: {
        id: 'periodType',
        label: '',
        component: {
          type: FormType.Select,
          selectOptions: periodTypeOpt
        },
        fieldOption: {
          initialValue: ticketClass ? ticketClass.period?.type : EPeriodType.MONTH
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
        initialValue: ticketClass ? ticketClass.extendYn : null,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: useYnOpt
      }
    },
    {
      id: 'available',
      label: '구매후사용가능일',
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
        initialValue: ticketClass ? ticketClass.available : 0
      },
      component: {
        type: FormType.Input
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
        initialValue: ticketClass ? ticketClass.delYn : null,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: delYnOpt.filter((d) => d.value !== EDelYn.ALL)
      }
    }
  ];
}
