import React from 'react';
import { IFormFieldConfig } from '@utils/form';
import { IFacilityObj } from '@models/facility';
import { FormType } from '@/constants/form';
import {
  categoryOpt,
  delYnOpt,
  ECategory,
  EDelYn,
  gateTypeOpt,
  lprTypeTypeOpt
} from '@/constants/list';
// import { BaseColConfig } from '@components/EditableTable/EditableTable';
// import { gateTypeOpt } from '@/constants/list';
// import { conversionEnumValue } from '@utils/conversion';
// import { IFacilityObj } from '@models/facility';
//
// export const columns = (update: (value: IFacilityObj) => void): BaseColConfig<IFacilityObj>[] => [
//   {
//     title: '게이트 ID',
//     dataIndex: 'gateId',
//     width: 200
//   },
//   {
//     title: '게이트이름',
//     dataIndex: 'gateName',
//     width: 200,
//     editConfig: {
//       editable: true,
//       inputType: 'text',
//       handleSave: async (record, form, toggleEdit) => {
//         await update(record);
//         toggleEdit();
//       }
//     }
//   },
//   {
//     title: '타입',
//     dataIndex: 'gateType',
//     filters: gateTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
//     // onFilter: (val, record) => {
//     //   return record.gateType((r) => r.info?.id === val) !== -1;
//     // },
//     render: (text: string, record) => {
//       return conversionEnumValue(record.gateType, gateTypeOpt).label;
//     },
//     editConfig: {
//       editable: true,
//       inputType: 'select',
//       initialValue: (form, record) => {
//         form.setFieldsValue({
//           gateType: conversionEnumValue(record.gateType, gateTypeOpt).label
//         });
//       },
//       handleSave: async (record, form, toggleEdit) => {
//         await update(record);
//         toggleEdit();
//       },
//       selectOptions: gateTypeOpt.map((r) => ({ label: r.label, value: r.value!! }))
//     }
//   },
//   {
//     title: '오픈 타입',
//     dataIndex: 'gateType',
//     filters: gateTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
//     // onFilter: (val, record) => {
//     //   return record.gateType((r) => r.info?.id === val) !== -1;
//     // },
//     render: (text: string, record) => {
//       return conversionEnumValue(record.gateType, gateTypeOpt).label;
//     },
//     editConfig: {
//       editable: true,
//       inputType: 'select',
//       initialValue: (form, record) => {
//         form.setFieldsValue({
//           gateType: conversionEnumValue(record.gateType, gateTypeOpt).label
//         });
//       },
//       handleSave: async (record, form, toggleEdit) => {
//         await update(record);
//         toggleEdit();
//       },
//       selectOptions: gateTypeOpt.map((r) => ({ label: r.label, value: r.value!! }))
//     }
//   }
// ];

export function facilityFields(
  gates?: any[],
  facility?: IFacilityObj
): IFormFieldConfig<keyof IFacilityObj>[] {
  return [
    {
      id: 'dtFacilitiesId',
      label: '장비ID',
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
        initialValue: facility ? facility.dtFacilitiesId : null,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'fname',
      label: '장비명',
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
        initialValue: facility ? facility.fname : null,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'gateId',
      label: '게이트ID',
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
        initialValue: facility ? facility.gateId : gates ? gates[0].value : undefined,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: gates ? gates : undefined
      }
    },
    {
      id: 'category',
      label: '카데고리',
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
        initialValue: facility ? facility.category : ECategory.LPR,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: categoryOpt
      }
    },
    {
      id: 'lprType',
      label: 'LPR TYPE',
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
        initialValue: facility ? facility.lprType : null
      },
      component: {
        type: FormType.Select,
        selectOptions: lprTypeTypeOpt
      }
    },
    {
      id: 'imagePath',
      label: '사진저장경로',
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
        initialValue: facility ? facility.imagePath : null
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'modelId',
      label: '모델ID',
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
        initialValue: facility ? facility.modelId : null,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'facilitiesId',
      label: '장비ID(TMAP)',
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
        initialValue: facility ? facility.facilitiesId : null
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'ip',
      label: 'IP',
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
        initialValue: facility ? facility.ip : null,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'port',
      label: 'PORT',
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
        initialValue: facility ? facility.port : null,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'resetPort',
      label: '리셋',
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
        initialValue: facility ? facility.resetPort : null,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input
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
        initialValue: facility ? facility.delYn : null,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: delYnOpt.filter((d) => d.value !== EDelYn.ALL)
      }
    },
    {
      id: 'gateType',
      label: 'gateType',
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
        initialValue: facility ? facility.gateType : null
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
        initialValue: facility ? facility.sn : null
      },
      component: {
        type: FormType.Input
      }
    }
  ];
}
