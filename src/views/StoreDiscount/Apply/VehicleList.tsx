import React, { PureComponent } from 'react';
import { ICorpSearchVehicleObj } from '@models/corp';
import { ColumnProps } from 'antd/es/table';
import { conversionDateTime } from '@utils/conversion';
import { Table } from 'antd';
import moment from 'moment';
import classNames from 'classnames';
import styled from 'styled-components';
import './styles/index.less';

interface IProps {
  vehicles: ICorpSearchVehicleObj[];
  onSelected: (value: ICorpSearchVehicleObj) => void;
}
interface IState {}

class VehicleList extends PureComponent<IProps, IState> {
  render() {
    const columns: ColumnProps<ICorpSearchVehicleObj>[] = [
      {
        title: '차량번호',
        dataIndex: 'vehicleNo',
        width: 100,
        align: 'center',
        render: (text: string, record: ICorpSearchVehicleObj) => record.vehicleNo
      },
      {
        title: '입차시간',
        dataIndex: 'inDate',
        width: 100,
        align: 'center',
        render: (text: string, record: ICorpSearchVehicleObj) => {
          return moment(record.inDate).format('YYYY-MM-DD HH:mm');
        }
      }
    ];

    const rowSelection = {
      onChange: (selectedRowKeys: number, selectedRows: ICorpSearchVehicleObj[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows[0]);
        this.props.onSelected(selectedRows[0]);
      },
      getCheckboxProps: (record: ICorpSearchVehicleObj) => ({
        sn: record.sn
      })
    };

    return (
      <>
        <Table
          className="Store-vehicle-table"
          scroll={{ x: 'max-content' }}
          columns={columns}
          loading={false}
          // @ts-ignore
          rowKey={(record: ICorpSearchVehicleObj) => String(record.sn)}
          dataSource={this.props.vehicles}
          // @ts-ignore
          rowSelection={{
            type: 'radio',
            ...rowSelection
          }}
        />
      </>
    );
  }
}

export default VehicleList;
