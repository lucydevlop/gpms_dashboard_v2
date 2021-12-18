import React, { PureComponent } from 'react';
import { ITicketClassObj } from '@models/ticketClass';
import StandardTable from '@components/StandardTable';
import { ColumnProps } from 'antd/es/table';
import { localeStore } from '@store/localeStore';
import {
  dayRangeTypeOpt,
  delYnOpt,
  EDelYn,
  ticketAplyTypeOpt,
  ticketTypeOpt,
  vehicleTypeOpt
} from '@/constants/list';
import { conversionEnumValue } from '@utils/conversion';

interface IProps {
  loading: boolean;
  ticketClasses: ITicketClassObj[];
}

interface IState {}

class TicketClassTab extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

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
        key: 'rangeType',
        width: 110,
        align: 'center',
        filters: dayRangeTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.rangeType.indexOf(value as string) === 0,
        render: (text: string, record: ITicketClassObj) =>
          conversionEnumValue(record.rangeType, dayRangeTypeOpt).label
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
      }
    ];
    return (
      <>
        <StandardTable
          scroll={{ x: 'max-content' }}
          //loading={this.props.loading}
          columns={columns}
          // @ts-ignore
          rowKey={(record: ITicketClassObj) => String(record.sn)}
          data={{ list: this.props.ticketClasses.filter((t) => t.delYn === EDelYn.N) }}
        />
      </>
    );
  }
}

export default TicketClassTab;
