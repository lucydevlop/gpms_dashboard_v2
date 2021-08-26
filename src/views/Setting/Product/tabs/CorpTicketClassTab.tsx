import React, { PureComponent } from 'react';
import { localeStore } from '@store/localeStore';
import { ICorpTicketClassObj } from '@models/corpTicketClass';
import { ColumnProps } from 'antd/lib/table';
import { delYnOpt, discountApplyTypeOpt, onOffSelectOpt, payTypeOpt } from '@/constants/list';
import { conversionEnumValue } from '@utils/conversion';
import { Button, Row } from 'antd';
import StandardTable from '@components/StandardTable';

interface IProps {
  loading: boolean;
  corpTicketClasses: ICorpTicketClassObj[];
  onSubmit: (info: ICorpTicketClassObj) => void;
}
interface IState {
  createModal: boolean;
  detailModal: boolean;
}

class CorpTicketClassTab extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      detailModal: false,
      createModal: false
    };
  }

  handleCreateClick = () => {
    this.setState({ createModal: true });
  };

  render() {
    const { localeObj } = localeStore;
    const columns: ColumnProps<ICorpTicketClassObj>[] = [
      {
        title: '사용여부',
        key: 'delYn',
        width: 80,
        align: 'center',
        filters: delYnOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.delYn.indexOf(value as string) === 0,
        render: (text: string, record: ICorpTicketClassObj) => {
          const value = conversionEnumValue(record.delYn, delYnOpt);
          return <span style={{ color: value.color }}>{value.label}</span>;
        }
      },
      {
        title: '입주사할인권명',
        key: 'name',
        width: 110,
        align: 'center',
        render: (text: string, record: ICorpTicketClassObj) => record.name
      },
      {
        title: '할인정보',
        // @ts-ignore
        children: [
          {
            title: '할인명',
            key: 'discountNm',
            align: 'center',
            width: 100,
            render: (text: string, record: ICorpTicketClassObj) => record.discountClass.discountNm
          },
          {
            title: '적용타입',
            key: 'discountType',
            align: 'center',
            width: 80,
            render: (text: string, record: ICorpTicketClassObj) =>
              conversionEnumValue(record.discountClass.discountApplyType, discountApplyTypeOpt)
                .label
          },
          {
            title: '적용값',
            key: 'unitTime',
            align: 'center',
            width: 80,
            render: (text: string, record: ICorpTicketClassObj) => record.discountClass.unitTime
          }
        ]
      },
      {
        title: '판매타입',
        key: 'name',
        width: 110,
        align: 'center',
        filters: payTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.saleType.indexOf(value as string) === 0,
        render: (text: string, record: ICorpTicketClassObj) =>
          conversionEnumValue(record.saleType, payTypeOpt).label
      },
      {
        title: '판매가',
        key: 'price',
        width: 110,
        align: 'center',
        render: (text: string, record: ICorpTicketClassObj) => record.price
      },
      {
        title: '적용제한',
        // @ts-ignore
        children: [
          {
            title: '1회',
            key: 'onceMax',
            align: 'center',
            width: 80,
            render: (text: string, record: ICorpTicketClassObj) =>
              record.onceMax >= 999999999 ? '무제한' : record.onceMax
          },
          {
            title: '1일',
            key: 'dayMax',
            align: 'center',
            width: 80,
            render: (text: string, record: ICorpTicketClassObj) =>
              record.dayMax >= 999999999 ? '무제한' : record.dayMax
          },
          {
            title: '1월',
            key: 'monthMax',
            align: 'center',
            width: 80,
            render: (text: string, record: ICorpTicketClassObj) =>
              record.monthMax >= 999999999 ? '무제한' : record.monthMax
          }
        ]
      },
      {
        title: '연장',
        key: 'extendYn',
        width: 80,
        align: 'center',
        render: (text: string, record: ICorpTicketClassObj) => {
          const value = conversionEnumValue(record.extendYn, onOffSelectOpt);
          return <span style={{ color: value.color }}>{value.label}</span>;
        }
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
          rowKey={(record: ICorpTicketClassObj) => String(record.sn)}
          data={{ list: this.props.corpTicketClasses }}
          hidePagination
        />
      </>
    );
  }
}

export default CorpTicketClassTab;
