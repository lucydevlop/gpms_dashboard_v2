import React, { useState, useEffect, useContext, useRef } from 'react';
import { Input, Form, Select, DatePicker, InputNumber } from 'antd';
import { EditableContext } from './EditableContext';
import { FormInstance } from 'antd/lib/form';
import { EditConfig } from './EditableTable';

interface EditableCellProps<T> extends React.HtmlHTMLAttributes<HTMLElement> {
  title: string;
  editConfig: EditConfig<T>;
  children: React.ReactNode;
  dataIndex: string;
  record: T;
  handleSave: (record: T, form: FormInstance, toggleEdit: () => void) => void;
  initialValue: any;
}

const EditableCell = <T extends { [key: string]: any }>({
  title,
  editConfig,
  children,
  dataIndex,
  record,
  handleSave,
  style,
  className,
  ...restProps
}: EditableCellProps<T>) => {
  const form = useContext(EditableContext);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input | any>(null);

  useEffect(() => {
    if (editing) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);

    if (editConfig.inputType === 'select') {
      // form.setFieldsValue({ [dataIndex]: record[dataIndex].id });
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    } else if (editConfig.inputType === 'selectMultiple') {
      form.setFieldsValue({
        [dataIndex]: record[dataIndex]
          .map((obj: any) => obj.id ?? null)
          .filter((val: string | null) => val)
      });
    } else {
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    }
  };

  const save = () => {
    handleSave(record, form, toggleEdit);
  };

  let childNode = children;

  if (editConfig?.initialValue) editConfig.initialValue(form, record);

  if (editConfig?.editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: editConfig.inputType !== 'selectMultiple',
            message: `${title} is required.`
          }
        ]}
      >
        {editConfig.inputType === 'text' ? (
          <Input
            ref={inputRef}
            onPressEnter={save}
            onBlur={save}
            onClick={(e) => e.stopPropagation()}
          />
        ) : editConfig.inputType === 'number' ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Form.Item noStyle name={dataIndex}>
              <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
          </div>
        ) : editConfig.inputType === 'date' ? (
          <div onClick={(e) => e.stopPropagation()}>
            <DatePicker
              ref={inputRef}
              open
              onChange={async (date, dateString) => {
                console.log(date, dateString);
                await form.setFieldsValue({ breakDate: date });

                save();
              }}
              onBlur={save}
            />
          </div>
        ) : editConfig.inputType === 'select' ? (
          <Select
            ref={(select) => (inputRef.current = select)}
            onBlur={save}
            onClick={(e) => e.stopPropagation()}
            options={editConfig.selectOptions}
            allowClear
            defaultOpen
          />
        ) : (
          <Select
            ref={(select) => (inputRef.current = select)}
            onBlur={save}
            onClick={(e) => e.stopPropagation()}
            options={editConfig.selectOptions}
            defaultOpen
            mode="multiple"
            showSearch
            allowClear
            filterOption={(input, option) => {
              // @ts-ignore
              return option?.label.toLowerCase().includes(input.toLowerCase());
            }}
          />
        )}
      </Form.Item>
    ) : (
      <p className="ltr-hover" style={{ display: 'inline-block' }}>
        {children}
      </p>
    );
  }

  return (
    <td
      className={`${className} ${editConfig?.editable ? 'editable-cell ltr-hover-container' : ''}`}
      onClick={editConfig?.editable ? toggleEdit : undefined}
      {...restProps}
      style={{ ...style }}
    >
      {childNode}
    </td>
  );
};

export default EditableCell;
