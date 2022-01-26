import React, { PureComponent } from 'react';
import { ITicketClassObj } from '@models/ticketClass';
import { localeStore } from '@store/localeStore';
import { ColumnProps } from 'antd/lib/table';
import {
  dayRangeTypeOpt,
  delYnOpt,
  EDelYn,
  periodTypeOpt,
  ticketAplyTypeOpt,
  ticketTypeOpt,
  useYnOpt,
  vehicleTypeOpt
} from '@/constants/list';
import { conversionEnumValue, convertWeekDay } from '@utils/conversion';
import { Button, Divider, Row } from 'antd';
import StandardTable from '@components/StandardTable';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DraggableModal from '@components/DraggableModal';
import TicketClassModal from '@views/Setting/Product/tabs/modals/TicketClassModal';
import zdsTips from '@utils/tips';

interface IProps {
  loading: boolean;
  ticketClasses: ITicketClassObj[];
  onSubmit: (info: ITicketClassObj) => void;
}

interface IState {
  detailModal: boolean;
  createModal: boolean;
  selected?: ITicketClassObj;
}

class TicketClassTab extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      detailModal: false,
      createModal: false
    };
  }

  handleCreateClick = () => {
    this.setState({ createModal: true });
  };

  handleBtnClick = (info: ITicketClassObj, key: string) => {
    const { localeObj } = localeStore;
    if (key === 'delete') {
      zdsTips.confirm(localeObj['alert.delete'] || '선택 항목을 삭제(비활성) 하시겠습니까?', () => {
        info.delYn = EDelYn.Y;
        this.props.onSubmit(info);
      });
    } else {
      this.setState({ detailModal: true, createModal: false, selected: info });
    }
  };

  render() {
    const { localeObj } = localeStore;
    const columns: ColumnProps<ITicketClassObj>[] = [
      {
        title: '사용여부',
        key: 'delYn',
        width: 80,
        align: 'center',
        filters: delYnOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.delYn.indexOf(value as string) === 0,
        render: (text: string, record: ITicketClassObj) => {
          const value = conversionEnumValue(record.delYn, delYnOpt);
          return <span style={{ color: value.color }}>{value.label}</span>;
        }
      },
      {
        title: '상품명',
        key: 'ticketName',
        width: 110,
        align: 'center',
        render: (text: string, record: ITicketClassObj) => record.ticketName
      },
      {
        title: '상품타입',
        key: 'ticketType',
        width: 110,
        align: 'center',
        filters: ticketTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.ticketType.indexOf(value as string) === 0,
        render: (text: string, record: ITicketClassObj) =>
          conversionEnumValue(record.ticketType, ticketTypeOpt).label
      },
      {
        title: '적용일',
        key: 'week',
        width: 110,
        align: 'center',
        //filters: dayRangeTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        //onFilter: (value, record) => record.rangeType.indexOf(value as string) === 0,
        render: (text: string, record: ITicketClassObj) =>
          record.week ? `${convertWeekDay(record.week)}` : ''
      },
      {
        title: '적용타입',
        key: 'aplyType',
        width: 110,
        align: 'center',
        filters: ticketAplyTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.aplyType.indexOf(value as string) === 0,
        render: (text: string, record: ITicketClassObj) =>
          conversionEnumValue(record.aplyType, ticketAplyTypeOpt).label
      },
      {
        title: '차량타입',
        key: 'vehicleType',
        width: 110,
        align: 'center',
        filters: vehicleTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.vehicleType.indexOf(value as string) === 0,
        render: (text: string, record: ITicketClassObj) =>
          conversionEnumValue(record.vehicleType, vehicleTypeOpt).label
      },
      {
        title: '적용시간',
        key: 'time',
        width: 110,
        align: 'center',
        render: (text: string, record: ITicketClassObj) => {
          return <span>{`${record.startTime} ~ ${record.endTime}`}</span>;
        }
      },
      {
        title: '가격',
        key: 'price',
        width: 110,
        align: 'center',
        render: (text: string, record: ITicketClassObj) => record.price
      },
      {
        title: '기간',
        key: 'period',
        width: 110,
        align: 'center',
        render: (text: string, record: ITicketClassObj) => {
          return (
            <span>{`${record.period?.number} ${
              conversionEnumValue(record.period ? record.period.type : '', periodTypeOpt).label
            }`}</span>
          );
        }
      },
      {
        title: '연장여부',
        key: 'extendYn',
        width: 80,
        align: 'center',
        filters: useYnOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.extendYn.indexOf(value as string) === 0,
        render: (text: string, record: ITicketClassObj) => {
          const value = conversionEnumValue(record.extendYn, useYnOpt);
          return <span style={{ color: value.color }}>{value.label}</span>;
        }
      },
      {
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: ITicketClassObj) => (
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
          loading={this.props.loading}
          columns={columns}
          // @ts-ignore
          rowKey={(record: ITicketClassObj) => String(record.sn)}
          data={{ list: this.props.ticketClasses }}
          hidePagination
        />
        {this.state.createModal ? (
          <DraggableModal
            title={localeObj['label.ticketClass.info' || '주차 상품']}
            visible={this.state.createModal}
            onOk={(): void => {
              this.setState({ createModal: false });
            }}
            onCancel={(): void => {
              this.setState({ createModal: false });
            }}
            width={800}
            footer={[]}
          >
            <TicketClassModal
              onSubmit={(value) => {
                this.setState({ createModal: false });
                this.props.onSubmit(value);
              }}
            />
          </DraggableModal>
        ) : null}
        {this.state.detailModal ? (
          <DraggableModal
            title={localeObj['label.ticketClass.info' || '주차 상품']}
            visible={this.state.detailModal}
            onOk={(): void => {
              this.setState({ detailModal: false });
            }}
            onCancel={(): void => {
              this.setState({ detailModal: false });
            }}
            width={800}
            footer={[]}
          >
            <TicketClassModal
              ticketClass={this.state.selected}
              onSubmit={(value) => {
                this.setState({ detailModal: false });
                this.props.onSubmit(value);
              }}
            />
          </DraggableModal>
        ) : null}
      </>
    );
  }
}

export default TicketClassTab;
