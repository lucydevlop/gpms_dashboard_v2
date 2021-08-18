import { Table } from 'antd';
import EditableRow from './EditableRow';
import EditableCell from './EditableCell';
import { ColumnGroupType, ColumnType, TableProps } from 'antd/lib/table';
import { FormInstance } from 'antd/lib/form';
import React from 'react';
import { ISelectOptions } from '@utils/form';

export type HandleSaveFn<T> = (record: T, form: FormInstance, toggleEdit: () => void) => void;
export interface EditConfig<T> {
  editable: boolean;
  inputType: 'select' | 'text' | 'selectMultiple' | 'date' | 'number';
  handleSave: HandleSaveFn<T>;
  selectOptions?: { label: string; value: number | string }[];
  initialValue?: (form: FormInstance, record: T) => any;
}
export interface BaseColConfig<RecordType> extends ColumnType<RecordType> {
  editConfig?: EditConfig<RecordType>;
}

export type Columns<T> = (BaseColConfig<T> | ColumnGroupType<T>)[];

interface EditableTableProps<T> extends TableProps<T> {
  columnConfig: Columns<T>;
  dataSrc: T[];
}

const EditableTable = <T extends { [prop: string]: any }>({
  columnConfig,
  dataSrc,
  ...rest
}: EditableTableProps<T>) => {
  const columnsWithEditability = columnConfig.map((col) => {
    // @ts-ignore
    if (!col?.editConfig?.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: T) => ({
        record,
        // @ts-ignore
        editConfig: col.editConfig,
        // @ts-ignore
        dataIndex: col.dataIndex,
        title: col.title,
        // @ts-ignore
        handleSave: col.editConfig?.handleSave
      })
    };
  });

  return (
    <Table
      components={{
        body: {
          row: EditableRow,
          cell: EditableCell
        }
      }}
      bordered
      dataSource={dataSrc.map((obj) => ({ ...obj, key: obj.id }))}
      columns={columnsWithEditability as Columns<T>}
      {...rest}
    />
  );
};

export default EditableTable;
