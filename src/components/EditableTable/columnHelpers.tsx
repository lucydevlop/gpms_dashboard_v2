import { ColumnType } from 'antd/lib/table';
import { getAllFilterProps } from './listBaseFiltering';
import { ISelectOptions } from '@utils/form';
import { FormInstance } from 'antd/lib/form';

// todo - refactor - do the same with the column helpers as done with the inputhelpers
export function getColumn<T>(
  label: string,
  name: keyof T,
  render?: (record: T) => React.ReactNode,
  searchEnabled: boolean = true
): ColumnType<T> {
  const column: ColumnType<T> = {
    title: label,
    dataIndex: name.toString(),
    ...getAllFilterProps<T>(name, searchEnabled)
  };

  if (render) column.render = (_value, record, _index) => render(record);

  return column;
}

export function getEditableColumn<T>(
  label: string,
  name: keyof T,
  handleSave: (record: T) => void,
  inputType: 'select' | 'text' | 'selectMultiple' | 'date' | 'number',
  selectOptions?: ISelectOptions[],
  initialValue?: (form: FormInstance, record: T) => any,
  render?: (record: T) => React.ReactNode,
  searchEnabled: boolean = true
): ColumnType<T> {
  const column: ColumnType<T> = {
    title: label,
    dataIndex: name.toString(),
    ...getAllFilterProps<T>(name, searchEnabled),

    onCell: (record) => ({
      record,
      editConfig: {
        editable: true,
        inputType: inputType,
        selectOptions: selectOptions,
        initialValue: initialValue
      },
      editable: true,
      dataIndex: name.toString(),
      title: label,
      handleSave: handleSave
    })
  };

  if (render) column.render = (_value, record, _index) => render(record);

  return column;
}

export function getActionsColumn<T>(renderActions: (record: T) => JSX.Element): ColumnType<T> {
  return {
    title: 'Action',
    key: 'action',
    render: (_value: any, record: T, _index: number) => {
      return renderActions(record);
    }
  };
}
