import React, { PureComponent } from 'react';
import { localeStore } from '@store/localeStore';
import { ICorpTicketClassObj } from '@models/corpTicketClass';
import { ColumnProps } from 'antd/lib/table';
import {
  delYnOpt,
  discountApplyTypeOpt,
  EDelYn,
  onOffSelectOpt,
  payTypeOpt
} from '@/constants/list';
import { conversionEnumValue, convertWeekDay } from '@utils/conversion';
import { Button, Divider, Row } from 'antd';
import StandardTable from '@components/StandardTable';
import DraggableModal from '@components/DraggableModal';
import CorpTicketModal from '@views/Setting/Product/tabs/modals/CorpTicketModal';
import { IDiscountClassObj } from '@models/discountClass';
import { ISelectOptions } from '@utils/form';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import zdsTips from '@utils/tips';

interface IProps {
  loading: boolean;
  corpTicketClasses: ICorpTicketClassObj[];
  discountSelectClasses: ISelectOptions[];
  onSubmit: (info: ICorpTicketClassObj) => void;
  discountClasses: IDiscountClassObj[];
}
interface IState {
  createModal: boolean;
  detailModal: boolean;
  selected?: ICorpTicketClassObj;
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

  handleBtnClick = (info: ICorpTicketClassObj, key: string) => {
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
        title: '적용일',
        key: 'week',
        width: 110,
        align: 'center',
        render: (text: string, record: ICorpTicketClassObj) =>
          record.week ? `${convertWeekDay(record.week)}` : ''
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
      },
      {
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: ICorpTicketClassObj) => (
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
          rowKey={(record: ICorpTicketClassObj) => String(record.sn)}
          data={{ list: this.props.corpTicketClasses }}
          hidePagination
        />
        {this.state.createModal ? (
          <DraggableModal
            visible={this.state.createModal}
            title={localeObj['label.corpDiscount.create'] || '입주사 할인권 생성'}
            onOk={(): void => {
              this.setState({ createModal: false });
            }}
            onCancel={(): void => {
              this.setState({ createModal: false });
            }}
            width={800}
            footer={[]}
          >
            <CorpTicketModal
              onSubmit={(value) => {
                this.setState({ createModal: false }), this.props.onSubmit(value);
              }}
              discountSelectClasses={this.props.discountSelectClasses}
              discountClasses={this.props.discountClasses}
            />
          </DraggableModal>
        ) : null}
        {this.state.detailModal ? (
          <DraggableModal
            visible={this.state.detailModal}
            title={localeObj['label.corpDiscount.detail'] || '입주사 할인권 상세'}
            onOk={(): void => {
              this.setState({ detailModal: false });
            }}
            onCancel={(): void => {
              this.setState({ detailModal: false });
            }}
            width={800}
            footer={[]}
          >
            <CorpTicketModal
              onSubmit={(value) => {
                this.setState({ detailModal: false }), this.props.onSubmit(value);
              }}
              discount={this.state.selected}
              discountSelectClasses={this.props.discountSelectClasses}
              discountClasses={this.props.discountClasses}
            />
          </DraggableModal>
        ) : null}
      </>
    );
  }
}

export default CorpTicketClassTab;
