import { IGateObj } from '@models/gate';
import { IFormFieldConfig } from '@utils/form';
import { FormType } from '@/constants/form';
import {
  EGateOpenActionType,
  EGateType,
  gateOpenActionTypeOpt,
  gateTypeOpt
} from '@/constants/list';

export function gateFields(gate?: IGateObj): IFormFieldConfig<keyof IGateObj>[] {
  return [
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
        initialValue: gate ? gate.gateId : '',
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'gateName',
      label: '게이트이름',
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
        initialValue: gate ? gate.gateName : '',
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    },
    {
      id: 'gateType',
      label: '게이트타입',
      colProps: {
        xs: 24,
        xl: 12
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
        initialValue: gate ? gate.gateType : EGateType.IN,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: gateTypeOpt
      }
    },
    {
      id: 'openAction',
      label: '오픈타입',
      colProps: {
        xs: 24,
        xl: 12
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
        initialValue: gate ? gate.openAction : EGateOpenActionType.NONE,
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Select,
        selectOptions: gateOpenActionTypeOpt
      }
    },
    {
      id: 'relaySvrKey',
      label: 'RELAY서버키',
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
        initialValue: gate ? gate.relaySvrKey : 'GATESVR1',
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'relaySvr',
      label: 'RELAY SVR URL',
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
        initialValue: gate ? gate.relaySvr : 'http://192.168.20.201/v1',
        rules: [{ required: true, message: '필수 입력값 입니다' }]
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'resetSvr',
      label: 'RESET URL',
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
        initialValue: gate ? gate.resetSvr : 'http://192.168.20.201/io.cgi?relay=',
        rules: [{ required: true, message: '필수 입력값 입니다' }]
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
        initialValue: gate ? gate.sn : null
      },
      component: {
        type: FormType.Input
      }
    },
    {
      id: 'delYn',
      label: 'delYn',
      fieldOption: {
        initialValue: gate ? gate.delYn : 'N'
      },
      component: {
        type: FormType.Input
      }
    }
  ];
}

// import { GetColumnSearchPropsFn } from '@utils/useColSearchProps';
// import { BaseColConfig } from '@components/EditableTable/EditableTable';
// import { IGateObj } from '@models/gate';
// import { EGateType, gateActionTypeOpt, gateOpenActionTypeOpt, gateTypeOpt } from '@/constants/list';
// import { conversionEnumValue } from '@utils/conversion';
// import { Button, Popconfirm } from 'antd';
// import React from 'react';
//
// // export const columns = (update: (record: IGateObj, key: string, value: any) => void): BaseColConfig<IGateObj>[] => [
// //   {
// //     title: '게이트 ID',
// //     dataIndex: 'gateId',
// //     width: 200
// //   },
// //   {
// //     title: '게이트이름',
// //     dataIndex: 'gateName',
// //     width: 200,
// //     editConfig: {
// //       editable: true,
// //       inputType: 'text',
// //       handleSave: async (record, form, toggleEdit) => {
// //         // await update(record);
// //         toggleEdit();
// //       }
// //     }
// //   },
// //   {
// //     title: '게이트타입',
// //     dataIndex: 'gateType',
// //     filters: gateTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
// //     onFilter: (val, record) => {
// //       return record.gateType === conversionEnumValue(val as string, gateTypeOpt).value;
// //     },
// //     render: (text: string, record) => {
// //       return conversionEnumValue(record.gateType, gateTypeOpt).label;
// //     },
// //     editConfig: {
// //       editable: true,
// //       inputType: 'select',
// //       initialValue: (form, record) => {
// //         form.setFieldsValue({
// //           gateType: conversionEnumValue(record.gateType, gateTypeOpt).label
// //         });
// //       },
// //       handleSave: async (record, form, toggleEdit) => {
// //         const { gateType } = await form.validateFields();
// //         console.log(gateType);
// //         await update(record, 'gateType', gateType);
// //         toggleEdit();
// //       },
// //       selectOptions: gateTypeOpt.map((r) => ({ label: r.label, value: r.value!! }))
// //     }
// //   },
// //   {
// //     title: '오픈타입',
// //     dataIndex: 'openAction',
// //     filters: gateOpenActionTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
// //     onFilter: (val, record) => {
// //       return record.openAction === conversionEnumValue(val as string, gateOpenActionTypeOpt).value;
// //     },
// //     render: (text: string, record) => {
// //       return conversionEnumValue(record.openAction, gateOpenActionTypeOpt).label;
// //     },
// //     editConfig: {
// //       editable: true,
// //       inputType: 'select',
// //       initialValue: (form, record) => {
// //         form.setFieldsValue({
// //           gateType: conversionEnumValue(record.openAction, gateOpenActionTypeOpt).label
// //         });
// //       },
// //       handleSave: async (record, form, toggleEdit) => {
// //         // await update(record);
// //         toggleEdit();
// //       },
// //       selectOptions: gateOpenActionTypeOpt.map((r) => ({ label: r.label, value: r.value!! }))
// //     }
// //   },
// //   {
// //     title: 'RELAY Svr Key',
// //     dataIndex: 'relaySvrKey',
// //     width: 200,
// //     editConfig: {
// //       editable: true,
// //       inputType: 'text',
// //       handleSave: async (record, form, toggleEdit) => {
// //         // await update(record);
// //         toggleEdit();
// //       }
// //     }
// //   },
// //   {
// //     title: 'RELAY Svr URL',
// //     dataIndex: 'relaySvr',
// //     width: 200,
// //     editConfig: {
// //       editable: true,
// //       inputType: 'text',
// //       handleSave: async (record, form, toggleEdit) => {
// //         // await update(record);
// //         toggleEdit();
// //       }
// //     }
// //   },
// //   {
// //     title: 'TAKE ACTION',
// //     dataIndex: 'takeAction',
// //     filters: gateActionTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
// //     onFilter: (val, record) => {
// //       return record.takeAction === conversionEnumValue(val as string, gateActionTypeOpt).value;
// //     },
// //     render: (text: string, record) => {
// //       return conversionEnumValue(record.takeAction, gateActionTypeOpt).label;
// //     },
// //     editConfig: {
// //       editable: true,
// //       inputType: 'select',
// //       initialValue: (form, record) => {
// //         form.setFieldsValue({
// //           gateType: conversionEnumValue(record.takeAction, gateActionTypeOpt).label
// //         });
// //       },
// //       handleSave: async (record, form, toggleEdit) => {
// //         // await update(record);
// //         toggleEdit();
// //       },
// //       selectOptions: gateActionTypeOpt.map((r) => ({ label: r.label, value: r.value!! }))
// //     }
// //   },
// //   {
// //     title: 'Action',
// //     dataIndex: 'operation',
// //     render: (_: any, record) => {
// //       const editable = record.sn === editingKey;
// //       return editable ? (
// //         <span>
// //             <Button type='link' onClick={() => save(record.sn)} style={{ marginRight: 8 }}>
// //               저장
// //             </Button>
// //             <Popconfirm title={formatMessage({ id: 'newlyandopened.prescriptionandtable.sureToCancel' })} onConfirm={cancel}>
// //               <a><FormattedMessage id='commonandfields.cancel' /></a>
// //             </Popconfirm>
// //           </span>
// //       ) : (
// //         <div>
// //           <Button type='link' disabled={editingKey !== ''} onClick={() => edit(record)}>
// //             <EditOutlined />
// //           </Button>
// //           <Button type='link' onClick={() => { remove(record.key) }}>
// //             <DeleteOutlined />
// //           </Button>
// //         </div>
// //       );
// //     },
// //   }
// // ];
