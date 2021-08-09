import { formColProps2Config, formColProps6Config, IFormFieldConfig } from '@utils/form';
import { IParkinglotSelectReq } from '@models/parkinglot';
import { FormType } from '@/constants/form';
import { cityOpt } from '@/constants/list';

export function searchParkinglotFields(): IFormFieldConfig<keyof IParkinglotSelectReq>[] {
  return [
    {
      id: 'city',
      label: '지역',
      ...formColProps6Config,
      component: {
        type: FormType.Select,
        option: {
          placeholder: '지역 선택',
          allowClear: true
        },
        selectOptions: cityOpt
      }
    },
    {
      id: 'name',
      label: '주차장명',
      ...formColProps6Config,
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      },
      formItemProps: {
        rules: [{ required: true, message: 'Please select your country!' }]
      }
    }
  ];
}
