import React, { PureComponent } from 'react';
import { IDiscountClassObj } from '@models/discountClass';
import { ColumnProps } from 'antd/lib/table';
import {
  dayRangeTypeOpt,
  delYnOpt,
  discountApplyRateOpt,
  discountApplyTypeOpt,
  discountTypeOpt,
  EDelYn
} from '@/constants/list';
import { conversionDate, conversionEnumValue } from '@utils/conversion';
import StandardTable from '@components/StandardTable';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Row } from 'antd';
import { localeStore } from '@store/localeStore';
import DraggableModal from '@components/DraggableModal';
import DiscountModal from '@views/Setting/Product/tabs/modals/DiscountModal';
import zdsTips from '@utils/tips';

interface IProps {
  loading: boolean;
  discountClasses: IDiscountClassObj[];
  onSubmit: (info: IDiscountClassObj) => void;
}
interface IState {
  detailModal: boolean;
  createModal: boolean;
  selected?: IDiscountClassObj;
}

class DiscountTab extends PureComponent<IProps, IState> {
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

  handleBtnClick = (info: IDiscountClassObj, key: string) => {
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
    const columns: ColumnProps<IDiscountClassObj>[] = [
      {
        title: '사용여부',
        key: 'delYn',
        width: 80,
        align: 'center',
        filters: delYnOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.delYn.indexOf(value as string) === 0,
        render: (text: string, record: IDiscountClassObj) => {
          const value = conversionEnumValue(record.delYn, delYnOpt);
          return <span style={{ color: value.color }}>{value.label}</span>;
        }
      },
      {
        title: '할인명',
        key: 'discountNm',
        width: 110,
        align: 'center',
        render: (text: string, record: IDiscountClassObj) => record.discountNm
      },
      {
        title: '적용시점',
        key: 'applyDate',
        width: 150,
        align: 'center',
        render: (text: string, record: IDiscountClassObj) => (
          <span>
            {conversionDate(record.effectDate, '{y}-{m}-{d}') || '--'}&nbsp;~&nbsp;
            {conversionDate(record.expireDate, '{y}-{m}-{d}') || '--'}
          </span>
        )
      },
      {
        title: '할인타입',
        key: 'discountType',
        width: 110,
        align: 'center',
        filters: discountTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.discountType.indexOf(value as string) === 0,
        render: (text: string, record: IDiscountClassObj) =>
          conversionEnumValue(record.discountType, discountTypeOpt).label
      },
      {
        title: '할인적용일',
        key: 'dayRange',
        width: 110,
        align: 'center',
        filters: dayRangeTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.dayRange.indexOf(value as string) === 0,
        render: (text: string, record: IDiscountClassObj) =>
          conversionEnumValue(record.dayRange, dayRangeTypeOpt).label
      },
      {
        title: '할인적용유형',
        key: 'discountApplyType',
        width: 110,
        align: 'center',
        filters: discountApplyTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.discountApplyType.indexOf(value as string) === 0,
        render: (text: string, record: IDiscountClassObj) =>
          conversionEnumValue(record.discountApplyType, discountApplyTypeOpt).label
      },
      {
        title: '할인적용율',
        key: 'discountApplyRate',
        width: 110,
        align: 'center',
        render: (text: string, record: IDiscountClassObj) =>
          conversionEnumValue(record.discountApplyRate, discountApplyRateOpt).label
      },
      {
        title: '할인적용값',
        key: 'unitTime',
        width: 110,
        align: 'center',
        render: (text: string, record: IDiscountClassObj) => record.unitTime
      },
      {
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: IDiscountClassObj) => (
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
          rowKey={(record: IDiscountClassObj) => String(record.sn)}
          data={{ list: this.props.discountClasses }}
          hidePagination
        />
        {this.state.createModal ? (
          <DraggableModal
            visible={this.state.createModal}
            title={localeObj['label.discount.create'] || '신규 등록'}
            width={800}
            onOk={() => this.setState({ createModal: false })}
            onCancel={() => this.setState({ createModal: false })}
            footer={[]}
          >
            <DiscountModal
              onSubmit={(value) => {
                this.setState({ createModal: false }), this.props.onSubmit(value);
              }}
            />
          </DraggableModal>
        ) : null}
        {this.state.detailModal ? (
          <DraggableModal
            visible={this.state.detailModal}
            title={localeObj['label.discount.detail'] || '할인권 상세'}
            width={800}
            onOk={() => this.setState({ detailModal: false })}
            onCancel={() => this.setState({ detailModal: false })}
            footer={[]}
          >
            <DiscountModal
              onSubmit={(value) => {
                this.setState({ detailModal: false }), this.props.onSubmit(value);
              }}
              discount={this.state.selected}
            />
          </DraggableModal>
        ) : null}
      </>
    );
  }
}

export default DiscountTab;
