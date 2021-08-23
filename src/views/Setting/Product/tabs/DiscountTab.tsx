import React, { PureComponent } from 'react';
import { IDiscountClassObj } from '@models/discountClass';
import { ColumnProps } from 'antd/lib/table';
import { dayRangeTypeOpt, delYnOpt, discountApplyTypeOpt, discountTypeOpt } from '@/constants/list';
import { conversionDate, conversionEnumValue } from '@utils/conversion';
import StandardTable from '@components/StandardTable';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Divider, Row } from 'antd';
import { localeStore } from '@store/localeStore';

interface IProps {
  loading: boolean;
  discountClasses: IDiscountClassObj[];
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
    this.setState({ detailModal: true, createModal: false, selected: info });
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
                this.handleBtnClick(item, 'edit');
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
      </>
    );
  }
}

export default DiscountTab;
