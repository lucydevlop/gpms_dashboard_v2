// import React, { PureComponent } from 'react';
// import { FormComponentProps } from '@ant-design/compatible/lib/form';
// import { GetFieldDecoratorOptions, WrappedFormUtils } from '@ant-design/compatible/lib/form/Form';
// import { Form } from 'antd';
// import { get } from 'lodash';
//
// export interface EditingRender {
//   fieldDecoratorOptions?: GetFieldDecoratorOptions;
//   itemRender: (text: any, record: any, index: number, form?: WrappedFormUtils) => React.ReactNode;
// }
//
// interface EditableCellProps extends FormComponentProps {
//   editable: boolean;
//   editing: boolean;
//   editingRender:
//     | ((
//         text: any,
//         record: any,
//         index: number,
//         title: string,
//         dataIndex: string,
//         form: WrappedFormUtils
//       ) => React.ReactNode)
//     | EditingRender;
//   record: any;
//   dataIndex: string;
//   /* row index */
//   index: number;
//   title: string;
// }
//
// class EditableCell extends PureComponent<EditableCellProps> {
//   renderCustom() {
//     const { form, editingRender, title, record, index, dataIndex } = this.props;
//     const text = get(record, dataIndex);
//     if (typeof editingRender === 'function') {
//       return editingRender(text, record, index, title, dataIndex, form);
//     }
//     const { getFieldDecorator } = form;
//     const { fieldDecoratorOptions = {}, itemRender } = editingRender;
//     return (
//       <Form.Item>
//         {getFieldDecorator(dataIndex, {
//           initialValue: text,
//           // @ts-ignore
//           ...fieldDecoratorOptions
//           // @ts-ignore
//         })(itemRender(text, record, index, title, dataIndex, form))}
//       </Form.Item>
//     );
//   }
//
//   render() {
//     const {
//       editable,
//       editing,
//       editingRender,
//       record,
//       dataIndex,
//       title,
//       index,
//       children,
//       ...restProps
//     } = this.props;
//     return <td {...restProps}>{editing && editingRender ? this.renderCustom() : children}</td>;
//   }
// }
//
// export default EditableCell;

// import { PermissionUtils } from '../utilities/PermissionUtils';
// import { dashboardStore } from '../stores/DashboardStore';
import * as React from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { Input, Form } from 'antd';

interface IEditableRowProps {
  index: number;
}

const EditableContext = React.createContext<any>(undefined);

export const EditableRow: React.FC<IEditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface IEditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: any;
  handleSave: (record: any) => void;
  onCellEdit(options: { languageId: string; keyId: string; exportConfigId?: string }): any;
}

export const EditableCell: React.FC<IEditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  onCellEdit,
  ...restProps
}) => {
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef(null);
  const form = React.useContext(EditableContext);
  const isCellEditEnabled = dataIndex !== 'name'; // || PermissionUtils.isDeveloperOrHigher(dashboardStore.getCurrentRole());

  React.useEffect(() => {
    if (editing) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    if (record.htmlEnabled && dataIndex !== 'name' && dataIndex !== 'description') {
      onCellEdit({
        languageId: dataIndex.substr('language-'.length),
        keyId: record.keyId,
        exportConfigId: record.exportConfigId
      });
    } else {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    }
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();

      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  // let childNode = children;

  // return (
  //   <td {...restProps}>
  //     {editable
  //       ? (childNode = editing ? (
  //           <FormItem style={{ margin: 0, minWidth: 320, maxWidth: '100%' }} name={dataIndex}>
  //             <Input.TextArea ref={inputRef} onPressEnter={save} onBlur={save} autoSize />
  //           </FormItem>
  //         ) : (
  //           <div
  //             className={isCellEditEnabled ? 'editable-cell-value-wrap' : undefined}
  //             style={{
  //               minWidth: 320,
  //               maxWidth: '100%',
  //               overflow: 'auto',
  //               display: 'flex',
  //               flexDirection: 'column',
  //               justifyContent: 'center',
  //               wordBreak: 'break-word'
  //             }}
  //             onClick={isCellEditEnabled ? toggleEdit : undefined}
  //             role="button"
  //             dangerouslySetInnerHTML={
  //               record.htmlEnabled
  //                 ? {
  //                     __html: children[1]
  //                   }
  //                 : undefined
  //             }
  //           >
  //             {/*{record.htmlEnabled ? undefined : children[1]}*/}
  //             {children}
  //           </div>
  //         ))
  //       : children}
  //   </td>
  // );

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex as string}
        rules={[
          {
            required: true,
            message: `${title} is required.`
          }
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24, minWidth: 100, minHeight: 30 }} // set the min width and height so in case the {children} will have no text, there is still an area on which the user can click
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
