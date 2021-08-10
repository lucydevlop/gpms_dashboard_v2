// import React, { Fragment } from 'react';
// import { Table, Alert } from 'antd';
// import {
//   TableListItem,
//   TableColumnProps,
//   TableState,
//   Filters,
//   Sorter,
//   StandardTableProps
// } from './data';
// import { TablePaginationConfig } from 'antd/es/table';
// import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';
// // import styles from './list.module.less';
// import * as PropTypes from 'prop-types';
// import { localeStore } from '@store/localeStore';
// import FormatterLocale from '@components/FormatterLocale';
// import EditableCell from '@components/EditTable/EditableCell';
//
// function initTotalList(columns: TableColumnProps[]) {
//   if (!columns) {
//     return [];
//   }
//   const totalList: TableColumnProps[] = [];
//   columns.forEach((column) => {
//     if (column.needTotal) {
//       totalList.push({ ...column, total: 0 });
//     }
//   });
//   return totalList;
// }
//
// function noop() {}
// class StandardTable extends React.Component<StandardTableProps, TableState> {
//   constructor(props: StandardTableProps) {
//     super(props);
//     const { columns } = props;
//     const needTotalList = initTotalList(columns);
//     this.state = {
//       selectedRowKeys: [],
//       needTotalList
//     };
//     // this.handleRowSelectChange = this.handleRowSelectChange.bind(this);
//   }
//
//   private prefixCls?: string;
//
//   handleRowSelectChange = (selectedRowKeys: string[] | number[], selectedRows: TableListItem[]) => {
//     let { needTotalList } = this.state;
//     needTotalList = needTotalList.map((item) => ({
//       ...item,
//       // @ts-ignore
//       total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0)
//     }));
//     const { onSelectRow } = this.props;
//     if (onSelectRow) {
//       onSelectRow(selectedRows);
//     }
//     // @ts-ignore
//     this.setState({ selectedRowKeys, needTotalList });
//   };
//
//   handleTableChange = (pagination: TablePaginationConfig, filters: Filters, sorter: Sorter) => {
//     const onChange = this.props.onChange;
//     if (onChange) {
//       onChange(pagination, filters, sorter);
//     }
//   };
//
//   cleanSelectedKeys = () => {
//     this.handleRowSelectChange([], []);
//     if (this.props.onCleanSelectedKeys) {
//       this.props.onCleanSelectedKeys();
//     }
//   };
//
//   renderTable = ({ getPrefixCls }: ConfigConsumerProps) => {
//     const { prefixCls: customizePrefixCls, columns, data, rowKey, ...rest } = this.props;
//     const { list = [], pagination = false } = data || {};
//     const prefixCls = getPrefixCls('filter', customizePrefixCls);
//     this.prefixCls = prefixCls;
//     const tableClassName = `${prefixCls}-table`;
//
//     const paginationProps = {
//       showSizeChanger: true,
//       showQuickJumper: true,
//       ...pagination
//     };
//     const selectedRowKeys = this.state.selectedRowKeys;
//     const rowSelection = {
//       fixed: true,
//       selectedRowKeys,
//       onChange: this.handleRowSelectChange,
//       getCheckboxProps: (record: TableListItem) => ({
//         disabled: record.disabled
//       })
//     };
//
//     const components = {
//       body: {
//         cell: EditableCell
//       }
//     };
//
//     const wrappedColumns = columns.map((col: any) => {
//       let { render } = col;
//       if (typeof render !== 'undefined') {
//         // @ts-ignore
//         render = (text: any, record: T, index: number) => col.render(text, record, index, form);
//       }
//       if (col.editable === false) {
//         return {
//           ...col,
//           render
//         };
//       }
//       return {
//         ...col,
//         render,
//         onCell: (record: { editing: any }) => ({
//           record,
//           dataIndex: col.dataIndex,
//           title: col.title,
//           editing: record.editing,
//           editingRender: col.editingRender
//         })
//       };
//     });
//
//     return (
//       <div className={tableClassName}>
//         {this.props.isSelected ? this.renderAlert() : null}
//         <Table
//           rowKey={rowKey || 'id'}
//           // @ts-ignore
//           rowSelection={this.props.isSelected ? rowSelection : null}
//           // @ts-ignore
//           dataSource={list}
//           pagination={this.props.hidePagination ? false : paginationProps}
//           components={components}
//           columns={wrappedColumns}
//           // @ts-ignore
//           onChange={this.handleTableChange}
//           // rowClassName={(record, idx) => {
//           //   if(idx % 2 === 1){return 'bg-row';}
//           // }}
//           {...rest}
//         />
//       </div>
//     );
//   };
//
//   renderAlert = () => {
//     const { localeObj } = localeStore;
//     const tableAlertProps = `${this.prefixCls}-standard-table-alert`;
//     const selectedRowKeys = this.state.selectedRowKeys;
//     const AlertMsg = (
//       <React.Fragment>
//         <FormatterLocale id="label.selected" />{' '}
//         <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>
//         <FormatterLocale id="label.items" /> &nbsp;&nbsp;
//         <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
//           <FormatterLocale id="label.clear" />
//         </a>
//       </React.Fragment>
//     );
//
//     return (
//       <div className={tableAlertProps}>
//         <Alert message={AlertMsg} type="info" showIcon />
//       </div>
//     );
//   };
//
//   render() {
//     return <ConfigConsumer>{this.renderTable}</ConfigConsumer>;
//   }
// }
//
// export default StandardTable;
//
// import { Empty, Table } from 'antd';
// import { SizeType } from 'antd/lib/config-provider/SizeContext';
// import * as React from 'react';
// import { EditableRow, EditableCell } from './EditableCell';
// import { TablePaginationConfig } from 'antd/lib/table';
//
// interface IEditableTableProps {
//   dataSource: any;
//   columns: any;
//   style?: React.CSSProperties;
//   bordered?: boolean;
//   loading?: boolean;
//   size?: SizeType;
//   projectId: any;
//   pagination?: false | TablePaginationConfig;
//   rowSelection?: any;
//   expandedRowRender?: any;
//   className?: string;
//   showHeader?: boolean;
//   onSave(oldRow: any, newRow: any): Promise<void>;
//   onCellEdit(options: { languageId: string; keyId: string; exportConfigId?: string }): void;
//   onTranslationUpdated(translation: any): void;
//   onKeyUpdated(key: any): void;
// }
// interface IEditableTableState {
//   dataSource: any[];
// }
//
// class EditableTable extends React.Component<IEditableTableProps, IEditableTableState> {
//   constructor(props: IEditableTableProps) {
//     super(props);
//
//     this.state = {
//       dataSource: props.dataSource
//     };
//   }
//
//   static getDerivedStateFromProps(props: IEditableTableProps) {
//     return {
//       dataSource: props.dataSource
//     };
//   }
//
//   handleDelete = (key: any) => {
//     const dataSource = [...this.state.dataSource];
//     this.setState({
//       dataSource: dataSource.filter((item) => {
//         return item.key !== key;
//       })
//     });
//   };
//
//   handleSave = async (row: any) => {
//     const newData = [...this.state.dataSource];
//     const index = newData.findIndex((data) => {
//       return row.key === data.key;
//     });
//     const oldRow = newData[index];
//     const newItem = {
//       ...oldRow,
//       ...row
//     };
//
//     await this.props.onSave(oldRow, row);
//
//     newData.splice(index, 1, newItem);
//     this.setState({ dataSource: newData });
//   };
//
//   render() {
//     const { dataSource } = this.state;
//     const components = {
//       body: {
//         row: EditableRow,
//         cell: EditableCell
//       }
//     };
//     const columns = this.props.columns.map((col: any) => {
//       if (!col.editable) {
//         return col;
//       }
//
//       return {
//         ...col,
//         onCell: (record: any) => {
//           return {
//             record,
//             editable: col.editable,
//             dataIndex: col.dataIndex,
//             title: col.title,
//             handleSave: this.handleSave,
//             onCellEdit: this.props.onCellEdit
//           };
//         }
//       };
//     });
//
//     return (
//       <Table
//         expandedRowRender={this.props.expandedRowRender}
//         rowSelection={this.props.rowSelection}
//         components={components}
//         className={this.props.className}
//         rowClassName={() => {
//           return 'editable-row';
//         }}
//         showHeader={this.props.showHeader}
//         bordered={this.props.bordered}
//         dataSource={dataSource}
//         columns={columns}
//         style={this.props.style}
//         loading={this.props.loading}
//         size={this.props.size}
//         pagination={this.props.pagination}
//         locale={{
//           emptyText: <Empty description="No keys found" image={Empty.PRESENTED_IMAGE_SIMPLE} />
//         }}
//       />
//     );
//   }
// }
//
// export { EditableTable };
//
// import React, { createContext, Component } from 'react';
// import { Table, Button, Popconfirm, Form } from 'antd';
// import { ColumnProps } from 'antd/es/table';
//
// // import { EditableFormRow } from './EditableRow';
// import { EditableCell } from './EditableCell';
// import { ColumnsType } from 'antd/lib/table';
//
// export const EditableContext = createContext<any>(null);
//
// type EditableListProps<T> = {
//   entries: T[];
//   columns: ColumnsType<T>;
//   rowKeySelector: (row: T) => string;
// };
//
// interface IPropsFromState {
//   dataSource: any[];
//   columns: [];
// }
//
// interface IPropsFromDispatch {
//   deleteRows: any;
//   updateRows: any;
// }
//
// interface IState {
//   editingKey: any;
// }
//
// type AllProps = IPropsFromState & IPropsFromDispatch;
//
// class EditableTable extends Component<EditableListProps<T>, IState> {
//   // private columns: Array<ColumnPropsEditable<any>>;
//
//   constructor(props: AllProps) {
//     super(props);
//
//     this.state = {
//       editingKey: ''
//     };
//
//     this.columns = [
//       ...props.columns,
//       {
//         title: '',
//         dataIndex: '',
//         width: '100px',
//         render: (text: string, record: any) => {
//           const { editingKey } = this.state;
//           const editable = this.isEditing(record);
//
//           return (
//             <div>
//               {editable ? (
//                 <span>
//                   <EditableContext.Consumer>
//                     {(form) => (
//                       <Button
//                         type="primary"
//                         size="small"
//                         style={{ marginRight: '10px', marginBottom: '10px' }}
//                         onClick={() => this.save(form, record._id)}
//                       >
//                         Save
//                       </Button>
//                     )}
//                   </EditableContext.Consumer>
//                   <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel()}>
//                     <Button danger size="small">
//                       Cancel
//                     </Button>
//                   </Popconfirm>
//                 </span>
//               ) : (
//                 <span>
//                   <Button
//                     type="primary"
//                     size="small"
//                     disabled={editingKey !== ''}
//                     style={{ marginRight: '10px', marginBottom: '10px' }}
//                     onClick={() => this.edit(record._id)}
//                   >
//                     Edit
//                   </Button>
//                   <Popconfirm
//                     title="Sure to delete?"
//                     onConfirm={() => this.handleDelete(record._id)}
//                   >
//                     <Button danger size="small">
//                       Delete
//                     </Button>
//                   </Popconfirm>
//                 </span>
//               )}
//             </div>
//           );
//         }
//       }
//     ];
//   }
//
//   isEditing = (record: any) => record._id === this.state.editingKey;
//
//   edit(key: any) {
//     this.setState({ editingKey: key });
//   }
//
//   cancel() {
//     this.setState({ editingKey: '' });
//   }
//
//   handleDelete(id: string) {
//     this.props.deleteRows({ id });
//   }
//
//   save(form: any, id: any) {
//     form.validateFields((error: any, row: any) => {
//       if (error) {
//         return;
//       }
//       const newData = [...this.props.dataSource];
//       const index = newData.findIndex((item) => id === item.sn);
//       if (index > -1) {
//         // const item = newData[index];
//         // newData.splice(index, 1, {
//         //   ...item,
//         //   ...row
//         // });
//         // this.setState({ data: newData, editingKey: '' });
//
//         this.props.updateRows({ id, payload: row });
//       } else {
//         // newData.push(row);
//         // this.setState({ data: newData, editingKey: '' });
//       }
//       this.setState({ editingKey: '' });
//     });
//   }
//
//   render() {
//     const [form] = Form.useForm();
//     const components = {
//       body: {
//         // row: EditableFormRow,
//         cell: EditableCell
//       }
//     };
//
//     const columns = this.columns.map((col: any) => {
//       let element = '';
//
//       if (!col.editable) {
//         return col;
//       }
//
//       if (col.formElementAs) {
//         element = col.formElementAs;
//       } else {
//         element = 'input';
//       }
//
//       return {
//         ...col,
//         onCell: (record: any) => ({
//           record,
//           // inputType: col.dataIndex === 'age' ? 'number' : 'text',
//           inputType: 'text',
//           element,
//           selectOptions: col.selectOptions,
//           optionValue: col.optionValue,
//           dataIndex: col.dataIndex,
//           title: col.title,
//           editing: this.isEditing(record)
//         })
//       };
//     });
//     // console.log(this.props.dataSource)
//     return (
//       <EditableContext.Provider value={form}>
//         <Table
//           rowKey={(record) => record._id}
//           components={components}
//           bordered={true}
//           columns={columns}
//           pagination={false}
//           dataSource={this.props.dataSource}
//         />
//       </EditableContext.Provider>
//     );
//   }
// }
//
// // const EditableFormTable = Form.create()(EditableTable);
// export default EditableTable;

import { Form, Input, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';

type EditableListProps<T> = {
  entries: T[];
  columns: ColumnsType<T>;
  rowKeySelector: (row: T) => string;
};

export class EditableList<T extends object> extends React.Component<EditableListProps<T>> {
  public render() {
    const EditableContext = React.createContext<any>(null);

    const EditableRow: FunctionComponent<EditableRowProps> = ({ index, ...props }) => {
      const [form] = Form.useForm();
      return (
        <Form form={form} component={false}>
          <EditableContext.Provider value={form}>
            <tr {...props} />
          </EditableContext.Provider>
        </Form>
      );
    };

    const EditableCell: FunctionComponent<EditableCellProps<T>> = ({
      title,
      editable,
      children,
      dataIndex,
      record,
      handleSave,
      ...restProps
    }) => {
      const [editing, setEditing] = useState(false);
      const inputRef = useRef<any>();
      const form = useContext(EditableContext);

      useEffect(() => {
        if (editing) {
          inputRef.current.focus();
        }
      }, [editing]);

      const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
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

    return (
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell
          }
        }}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={this.props.entries}
        size="small"
        rowKey={(row) => this.props.rowKeySelector(row)}
        columns={this.props.columns}
      />
    );
  }
}

interface EditableRowProps {
  index: number;
}

type EditableCellProps<T> = {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof T;
  record: T;
  handleSave: (record: T) => void;
};
