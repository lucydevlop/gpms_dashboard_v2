import { IGateObj } from '@models/gate';
import { IFormFieldConfig } from '@utils/form';
import { FormType } from '@/constants/form';

export function gateFields(gate?: IGateObj): IFormFieldConfig<keyof IGateObj>[] {
  return [
    {
      id: 'gateId',
      label: '게이트ID',
      colProps: {
        span: 24
      },
      formItemProps: {
        labelCol: {
          span: 5
        },
        wrapperCol: {
          span: 19
        },
        children: null
      },
      fieldOption: {
        initialValue: gate ? gate.gateId : ''
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
