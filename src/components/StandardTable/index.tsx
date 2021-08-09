import React, { Fragment } from 'react';
import { Table, Alert } from 'antd';
import {
  TableListItem,
  TableColumnProps,
  TableState,
  Filters,
  Sorter,
  StandardTableProps
} from './data';
import { TablePaginationConfig } from 'antd/es/table';
import { ConfigConsumer, ConfigConsumerProps } from 'antd/lib/config-provider';
// import styles from './list.module.less';
import * as PropTypes from 'prop-types';
import { localeStore } from '@store/localeStore';
import FormatterLocale from '@components/FormatterLocale';

function initTotalList(columns: TableColumnProps[]) {
  if (!columns) {
    return [];
  }
  const totalList: TableColumnProps[] = [];
  columns.forEach((column) => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

function noop() {}
class StandardTable extends React.Component<StandardTableProps, TableState> {
  constructor(props: StandardTableProps) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);
    this.state = {
      selectedRowKeys: [],
      needTotalList
    };
    // this.handleRowSelectChange = this.handleRowSelectChange.bind(this);
  }

  private prefixCls?: string;

  handleRowSelectChange = (selectedRowKeys: string[] | number[], selectedRows: TableListItem[]) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map((item) => ({
      ...item,
      // @ts-ignore
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0)
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }
    // @ts-ignore
    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination: TablePaginationConfig, filters: Filters, sorter: Sorter) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
    if (this.props.onCleanSelectedKeys) {
      this.props.onCleanSelectedKeys();
    }
  };

  renderTable = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, data, rowKey, ...rest } = this.props;
    const { list = [], pagination = false } = data || {};
    const prefixCls = getPrefixCls('filter', customizePrefixCls);
    this.prefixCls = prefixCls;
    const tableClassName = `${prefixCls}-table`;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination
    };
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      fixed: true,
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: (record: TableListItem) => ({
        disabled: record.disabled
      })
    };
    return (
      <div className={tableClassName}>
        {this.props.isSelected ? this.renderAlert() : null}
        <Table
          rowKey={rowKey || 'id'}
          // @ts-ignore
          rowSelection={this.props.isSelected ? rowSelection : null}
          // @ts-ignore
          dataSource={list}
          pagination={this.props.hidePagination ? false : paginationProps}
          // @ts-ignore
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  };

  renderAlert = () => {
    const { localeObj } = localeStore;
    const tableAlertProps = `${this.prefixCls}-standard-table-alert`;
    const selectedRowKeys = this.state.selectedRowKeys;
    const AlertMsg = (
      <React.Fragment>
        <FormatterLocale id="label.selected" />{' '}
        <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>
        <FormatterLocale id="label.items" /> &nbsp;&nbsp;
        <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
          <FormatterLocale id="label.clear" />
        </a>
      </React.Fragment>
    );

    return (
      <div className={tableAlertProps}>
        <Alert message={AlertMsg} type="info" showIcon />
      </div>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderTable}</ConfigConsumer>;
  }
}

export default StandardTable;
