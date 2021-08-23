import { ITicketClassObj } from '@models/ticketClass';
import { IFormFieldConfig } from '@utils/form';
import {
  dayRangeTypeOpt,
  EDayRangeType,
  ETicketAplyType,
  ETicketType,
  EVehicleType,
  ticketAplyTypeOpt,
  ticketTypeOpt,
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
        selectOptions: ticketTypeOpt
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
    {
      id: 'rangeType',
      label: '적용일',
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
        initialValue: ticketClass ? ticketClass.rangeType : EDayRangeType.ALL,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: dayRangeTypeOpt
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
        // format: "HH:mm",
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
          allowClear: true
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
    }
  ];
}
