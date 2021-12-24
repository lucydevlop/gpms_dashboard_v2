import { IHolidayObj } from '@models/holiday';
import { IFormFieldConfig } from '@utils/form';
import { FormType } from '@/constants/form';
import { EDelYn } from '@/constants/list';

export function getHolidayFields(holiday?: IHolidayObj): IFormFieldConfig<keyof IHolidayObj>[] {
  const isWorikingOption = [
    { value: 'ON', label: '오픈' },
    { value: 'OFF', label: '휴일' }
  ];
  return [
    {
      id: 'name',
      label: '명칭',
      colProps: {
        span: 6,
        xs: 24,
        md: 6,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 10
        },
        wrapperCol: {
          span: 14
        },
        children: null
      },
      fieldOption: {
        initialValue: holiday ? holiday.name : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'working',
      label: '오픈여부',
      colProps: {
        span: 6,
        xs: 24,
        md: 6,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 10
        },
        wrapperCol: {
          span: 14
        },
        children: null
      },
      fieldOption: {
        initialValue: holiday ? holiday.working : isWorikingOption[0].value
      },
      component: {
        type: FormType.Select,
        option: {
          placeholder: '선택하세요'
        },
        selectOptions: isWorikingOption
      }
    },
    {
      id: 'startTime',
      label: '시작시간',
      colProps: {
        span: 6,
        xs: 24,
        md: 6,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 10
        },
        wrapperCol: {
          span: 14
        },
        children: null
      },
      fieldOption: {
        initialValue: holiday ? holiday.startTime : '0000'
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'endTime',
      label: '종료시간',
      colProps: {
        span: 6,
        xs: 24,
        md: 6,
        xl: 12
      },
      formItemProps: {
        labelCol: {
          span: 10
        },
        wrapperCol: {
          span: 14
        },
        children: null
      },
      fieldOption: {
        initialValue: holiday ? holiday.endTime : '2359'
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'startDate',
      label: '시작일',
      fieldOption: {
        initialValue: holiday ? holiday.startDate.substring(0, 10) : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'endDate',
      label: '종료일',
      fieldOption: {
        initialValue: holiday ? holiday.endDate.substring(0, 10) : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'startTime',
      label: '시작일시',
      fieldOption: {
        initialValue: holiday ? holiday.startTime : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'endTime',
      label: '종료일시',
      fieldOption: {
        initialValue: holiday ? holiday.endTime : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'sn',
      label: 'sn',
      fieldOption: {
        initialValue: holiday ? holiday.sn : ''
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'delYn',
      label: 'delYn',
      fieldOption: {
        initialValue: holiday ? holiday.delYn : EDelYn.N
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
