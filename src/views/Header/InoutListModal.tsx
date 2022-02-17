import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { IInoutObj } from '@models/inout';
import { conversionDateTime } from '@utils/conversion';
import { Image, Table } from 'antd';
import { IParkinglotObj } from '@models/parkinglot';

interface IProps {
  inouts: IInoutObj[];
  onSelect: (inout: IInoutObj) => void;
}
interface IState {
  selects: any[];
  selected?: any;
}

@inject('localeStore')
@observer
class InoutListModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selects: []
    };
  }

  onSelect = (inout: IInoutObj) => {
    //console.log('onSelect', inout);
    this.props.onSelect(inout);
  };

  // onRowKeysChange = (keys: any) => {
  //   this.setState({ selects: keys, selected: keys[0] }, () =>
  //     this.onSelect(this.state.selected.parkinSn)
  //   );
  // };

  render() {
    const { selected } = this.state;
    const columns: any[] = [
      {
        dataIndex: 'vehicleNo',
        title: '차량번호',
        key: 'vehicleNo',
        width: 90,
        align: 'center',
        editable: true,
        render: (text: string, record: IInoutObj) => (record.vehicleNo ? record.vehicleNo : '-')
      },
      {
        dataIndex: 'inDate',
        title: '입차',
        key: 'inDate',
        width: 120,
        align: 'center',
        render: (text: string, record: IInoutObj) =>
          conversionDateTime(record.inDate, '{y}-{m}-{d} {h}:{i}') || '--'
      },
      {
        dataIndex: 'inImgBase64Str',
        key: 'inImgBase64Str',
        title: '입차사진',
        width: 130,
        align: 'center',
        render: (text: any, record: IInoutObj) => <Image src={`${record.inImgBase64Str}`} />
      },
      {
        title: '선택',
        width: 130,
        align: 'center',
        render: (text: any, record: IInoutObj) => (
          <span>
            <a onClick={() => this.onSelect(record)}>선택</a>
          </span>
        )
      }
    ];

    return (
      <>
        <Table
          columns={columns}
          dataSource={this.props.inouts}
          rowKey={(record) => (record.inSn ? record.inSn.toString() : '-1')}
          pagination={false}
          // rowSelection={{
          //   type: 'radio',
          //   selectedRowKeys: this.state.selected,
          //   onChange: this.onRowKeysChange
          // }}
          // onRow={(record: IInoutObj) => {
          //   return {
          //     onClick: () => {
          //       this.onSelect(record.parkinSn ? record.parkinSn : -1);
          //     }
          //   };
          // }}
        />
      </>
    );
  }
}

export default InoutListModal;
