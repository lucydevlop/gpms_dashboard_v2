import React, { PureComponent } from 'react';
import { IGateObj } from '@models/gate';
import { ColumnProps } from 'antd/lib/table';
import { conversionEnumValue } from '@utils/conversion';
import { delYnOpt, EDelYn, gateOpenActionTypeOpt, gateTypeOpt } from '@/constants/list';
import StandardTable from '@components/StandardTable';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { IFacilityObj } from '@models/facility';
import { Button, Divider, Row } from 'antd';
import zdsTips from '@utils/tips';
import { inject, observer } from 'mobx-react';
import { localeStore } from '@store/localeStore';
import GateModal from '@views/Setting/Facility/tabs/modals/GateModal';
import DraggableModal from '@components/DraggableModal';
interface IProps {
  gates: IGateObj[];
  loading: boolean;
  onUpdate: (info: IGateObj) => void;
  onCreate: (info: IGateObj) => void;
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

  handleCreateClick() {
    this.setState({ detailModal: false, createModal: true });
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
    const { localeObj } = localeStore;
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
        title: '게이트ID',
        key: 'gateId',
        width: 110,
        align: 'center',
        render: (text: string, record: IGateObj) => record.gateId
      },
      {
        title: 'UDP게이트ID',
        key: 'udpGateid',
        width: 110,
        align: 'center',
        render: (text: string, record: IGateObj) => record.udpGateid
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
        title: 'takeAction',
        key: 'takeAction',
        width: 110,
        align: 'center',
        render: (text: string, record: IGateObj) =>
          conversionEnumValue(record.takeAction as string, gateTypeOpt).label
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
        title: 'RESET URL',
        key: 'resetSvr',
        width: 110,
        align: 'center',
        render: (text: string, record: IGateObj) => record.resetSvr
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
        <Row style={{ marginBottom: '1rem' }}>
          <Button
            type="primary"
            onClick={(e: any) => {
              e.stopPropagation();
              this.handleCreateClick();
            }}
          >
            + {localeObj['label.create'] || '신규 등록'}
          </Button>
        </Row>
        <StandardTable
          scroll={{ x: 'max-content' }}
          columns={columns}
          loading={this.props.loading}
          // @ts-ignore
          rowKey={(record: IGateObj) => String(record.sn)}
          data={{ list: this.props.gates }}
          hidePagination
        />
        {this.state.createModal ? (
          <DraggableModal
            title={localeObj['label.gate.info'] || '게이트 상세'}
            visible={this.state.createModal}
            onOk={(): void => {
              this.setState({ createModal: false });
            }}
            onCancel={(): void => {
              this.setState({ createModal: false });
            }}
            width={800}
          >
            <GateModal
              onSubmit={(value) => {
                this.setState({ createModal: false });
                this.props.onCreate(value);
              }}
            />
          </DraggableModal>
        ) : null}
        {this.state.detailModal ? (
          <DraggableModal
            title={localeObj['label.gate.info'] || '게이트 상세'}
            visible={this.state.detailModal}
            onOk={(): void => {
              this.setState({ detailModal: false });
            }}
            onCancel={(): void => {
              this.setState({ detailModal: false });
            }}
            width={800}
          >
            <GateModal
              gate={this.state.selected}
              onSubmit={(value) => {
                this.setState({ detailModal: false });
                this.props.onUpdate(value);
              }}
            />
          </DraggableModal>
        ) : null}
      </>
    );
  }
}

export default GateTab;
