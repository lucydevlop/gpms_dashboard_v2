import React, { PureComponent } from 'react';
import { IGateObj } from '@models/gate';
import { ColumnProps } from 'antd/lib/table';
import { conversionEnumValue } from '@utils/conversion';
import { delYnOpt, EDelYn, gateOpenActionTypeOpt, gateTypeOpt } from '@/constants/list';
import StandardTable from '@components/StandardTable';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { IFacilityObj } from '@models/facility';
import { Divider } from 'antd';
import zdsTips from '@utils/tips';
import { inject, observer } from 'mobx-react';
import { localeStore } from '@store/localeStore';
interface IProps {
  gates: IGateObj[];
  loading: boolean;
  onUpdate: (info: IGateObj) => void;
}

interface IState {
  detailModal: boolean;
  createModal: boolean;
  selected?: IGateObj;
}

@inject('localeStore')
@observer
class GateTab extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      detailModal: false,
      createModal: false
    };
  }

  handleBtnClick = (info: IGateObj, key: string) => {
    const { localeObj } = localeStore;
    //console.log('handleBtnClick', info);
    if (key === 'delete') {
      zdsTips.confirm(localeObj['alert.delete'] || '선택 항목을 삭제(비활성) 하시겠습니까?', () => {
        info.delYn = EDelYn.Y;
        this.props.onUpdate(info);
      });
    } else {
      this.setState({ detailModal: true, createModal: false, selected: info });
    }
  };

  render() {
    const columns: ColumnProps<IGateObj>[] = [
      {
        title: '사용여부',
        key: 'delYn',
        width: 100,
        align: 'center',
        filters: delYnOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.delYn.indexOf(value as string) === 0,
        render: (text: string, record: IGateObj) => {
          const value = conversionEnumValue(record.delYn, delYnOpt);
          return <span style={{ color: value.color }}>{value.label}</span>;
        }
      },
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
        title: 'RELAY SVR Key',
        key: 'relaySvrKey',
        width: 110,
        align: 'center',
        render: (text: string, record: IGateObj) => record.relaySvrKey
      },
      {
        title: 'RELAY SVR URL',
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
                this.handleBtnClick(item, 'edit');
              }}
            >
              <EditOutlined />
            </a>
            <Divider type="vertical" />
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item, 'delete');
              }}
            >
              <DeleteOutlined />
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
