import React, { PureComponent } from 'react';
import { IGateObj } from '@models/gate';
import { ColumnProps } from 'antd/lib/table';
import { conversionEnumValue } from '@utils/conversion';
import { gateOpenActionTypeOpt, gateTypeOpt } from '@/constants/list';
import StandardTable from '@components/StandardTable';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
interface IProps {
  gates: IGateObj[];
  loading: boolean;
}

interface IState {
  detailModal: boolean;
  createModal: boolean;
  selected?: IGateObj;
}

class GateTab extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      detailModal: false,
      createModal: false
    };
  }

  handleBtnClick = (info: IGateObj) => {
    //console.log('handleBtnClick', info);
    this.setState({ detailModal: true, createModal: false, selected: info });
  };

  render() {
    const columns: ColumnProps<IGateObj>[] = [
      {
        title: '게이트 ID',
        key: 'gateId',
        fixed: 'left',
        width: 110,
        align: 'center',
        render: (text: string, record: IGateObj) => record.gateId
      },
      {
        title: '게이트이름',
        key: 'gateName',
        width: 110,
        align: 'center',
        render: (text: string, record: IGateObj) => record.gateName
      },
      {
        title: '게이트타입',
        key: 'gateType',
        width: 110,
        align: 'center',
        render: (text: string, record: IGateObj) =>
          conversionEnumValue(record.gateType as string, gateTypeOpt).label
      },
      {
        title: '오픈타입',
        key: 'openAction',
        width: 110,
        align: 'center',
        render: (text: string, record: IGateObj) =>
          conversionEnumValue(record.openAction as string, gateOpenActionTypeOpt).label
      },
      {
        title: 'RELAY Svr Key',
        key: 'relaySvrKey',
        width: 110,
        align: 'center',
        render: (text: string, record: IGateObj) => record.relaySvrKey
      },
      {
        title: 'RELAY Svr URL',
        key: 'relaySvr',
        width: 110,
        align: 'center',
        render: (text: string, record: IGateObj) => record.relaySvr
      },
      {
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: IGateObj) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item);
              }}
            >
              <EditOutlined />
            </a>
          </div>
        )
      }
    ];

    return (
      <>
        <StandardTable
          scroll={{ x: 'max-content' }}
          columns={columns}
          loading={this.props.loading}
          // @ts-ignore
          rowKey={(record: IGateObj) => String(record.sn)}
          data={{ list: this.props.gates }}
          hidePagination
        />
      </>
    );
  }
}

export default GateTab;
