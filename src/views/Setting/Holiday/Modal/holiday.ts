import { IHolidayObj } from '@models/holiday';
import { IFormFieldConfig } from '@utils/form';
import { FormType } from '@/constants/form';

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
        span: 8,
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
        span: 8,
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
      id: 'startDate',
      label: '시작일',
      fieldOption: {
        initialValue: holiday ? holiday.startDate : ''
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
        initialValue: holiday ? holiday.endDate : ''
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
    }
  ];
}
