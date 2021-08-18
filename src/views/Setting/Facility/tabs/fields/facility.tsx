import React from 'react';
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
