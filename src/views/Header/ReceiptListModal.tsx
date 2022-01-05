import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import InoutPayment from '@views/Inout/Payment';
import { IInoutPaymentSelectReq } from '@models/inout';
import { IInoutPaymentObj } from '@models/inoutPayment';
import moment from 'moment';
import { getInoutPayments } from '@api/Inout';
import { runInAction } from 'mobx';
import {
  conversionDate,
  conversionEnumValue,
  convertNumberWithCommas,
  convertStringToDateTime
} from '@utils/conversion';
import { TablePaginationConfig } from 'antd/es/table';
import Table, { ColumnProps } from 'antd/lib/table';
import { paymentTypeOpt, resultTypeOpt } from '@/constants/list';
import { Button } from 'antd';
import PageWrapper from '@components/PageWrapper';
import SearchForm from '@components/StandardTable/SearchForm';
import StandardTable from '@components/StandardTable';
import DraggableModal from '@components/DraggableModal';
import ReceiptModal from '@views/Header/ReceiptModal';
import { disabledDateAfterToday, IFormFieldConfig } from '@utils/form';
import { localeStore } from '@store/localeStore';
import { FormType } from '@/constants/form';
import { datePickerFormat } from '@/constants';

interface IProps {}
interface IState {
  loading: boolean;
  searchParam?: IInoutPaymentSelectReq;
  list: IInoutPaymentObj[];
  current: number;
  pageSize: number;
  total: number;
  selected?: IInoutPaymentObj;
  receiptModal: boolean;
}

@inject('parkinglotStore', 'localeStore')
@observer
class ReceiptListModal extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      list: [],
      total: 0,
      current: 1,
      pageSize: 10,
      receiptModal: false
    };
  }

  componentDidMount() {
    const createTm = [moment(new Date()).subtract(3, 'days'), moment(new Date())];
    const searchParam: IInoutPaymentSelectReq = {
      startDate: createTm[0].format('YYYY-MM-DD'),
      endDate: createTm[1].format('YYYY-MM-DD'),
      createTm: [createTm[0].unix(), createTm[1].unix()],
      vehicleNo: '',
      resultType: 'SUCCESS',
      limit: 0
    };

    this.setState(
      {
        searchParam: searchParam
      },
      () => this.pollData()
    );
  }

  async pollData() {
    this.setState({ loading: true });
    getInoutPayments(this.state.searchParam)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            // console.log(data);
            this.setState({
              // list: data.filter((l: any) => l.result !== 'WAIT'),
              list: data.filter((l: any) => l.amount > 0),
              total: data.length
            });
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  getSearchData = (info: IInoutPaymentSelectReq) => {
    const searchParam: IInoutPaymentSelectReq = {
      startDate: conversionDate(info.createTm[0]), //info.createTm[0].format('YYYY-MM-DD'),
      endDate: conversionDate(info.createTm[1]), //info.createTm[1].format('YYYY-MM-DD'),
      createTm: info.createTm,
      vehicleNo: info.vehicleNo === undefined ? '' : info.vehicleNo,
      resultType: 'SUCCESS',
      limit: 0
    };
    this.setState({ searchParam: searchParam, current: 1 }, () => this.pollData());
  };

  paginationChange = (pagination: TablePaginationConfig) => {
    this.setState({ current: pagination.current || 1 });
  };

  render() {
    const columns: ColumnProps<IInoutPaymentObj>[] = [
      {
        title: '차량번호',
        key: 'vehicleNo',
        fixed: 'left',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => record.vehicleNo
      },
      {
        title: '정산타입',
        key: 'type',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) =>
          conversionEnumValue(record.type, paymentTypeOpt).label
      },
      {
        title: '결제일자',
        key: 'vehicleNo',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) =>
          convertStringToDateTime(record.approveDateTime) || '--'
      },
      {
        title: '결제금액',
        key: 'amount',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => convertNumberWithCommas(record.amount)
      },
      {
        title: '카드',
        key: 'cardCorp',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => record.cardCorp
      },
      {
        title: '카드번호',
        key: 'cardNumber',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => record.cardNumber
      },
      {
        title: '영수증',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => {
          return (
            <Button onClick={(event) => this.setState({ selected: record, receiptModal: true })}>
              영수증
            </Button>
          );
        }
      }
    ];
    const { list, total, current, pageSize } = this.state;
    const searchFields = searchInoutPaymentFields();
    return (
      <>
        <SearchForm submit={(value) => this.getSearchData(value)} fieldConfig={searchFields} />
        <StandardTable
          scroll={{ x: 'max-content', y: 800 }}
          columns={columns}
          loading={this.state.loading}
          // @ts-ignore
          rowKey={(record: IInoutPaymentObj) => String(record.sn)}
          data={{
            list,
            pagination: {
              total,
              current,
              pageSize,
              showSizeChanger: true,
              onShowSizeChange: (currentNum: any, size: any) => {
                this.setState({ pageSize: size });
                this.setState({ current: currentNum });
              }
            }
          }}
          onChange={this.paginationChange}
          // isSelected
        />
        {this.state.receiptModal && this.state.selected ? (
          <DraggableModal
            title={'영수증 정보'}
            visible={this.state.receiptModal}
            width={500}
            onOk={() => this.setState({ receiptModal: false })}
            onCancel={(): void => {
              this.setState({ receiptModal: false });
            }}
          >
            <ReceiptModal payment={this.state.selected} />
          </DraggableModal>
        ) : null}
      </>
    );
  }
}

export default ReceiptListModal;

const regisDateRangeConfig = {
  rules: [
    {
      type: 'array',
      required: false,
      message: localeStore.localeObj['alert.select.time'] || '시간을 선택하세요'
    }
  ],
  format: datePickerFormat,
  initialValue: [moment(new Date()).subtract(3, 'days'), moment(new Date())]
};

function searchInoutPaymentFields(): IFormFieldConfig<keyof IInoutPaymentSelectReq>[] {
  const { localeObj } = localeStore;
  return [
    {
      id: 'createTm',
      label: '조회기간',
      colProps: {
        span: 8,
        xs: 24,
        md: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          span: 5,
          xl: 5,
          md: 5,
          xs: 5
        },
        wrapperCol: {
          span: 19,
          xs: 19,
          md: 19,
          xl: 19
        }
      },
      component: {
        type: FormType.RangePicker,
        option: {
          placeholder: [
            localeObj['label.startDate'] || '시작일',
            localeObj['label.endDate'] || '종료일'
          ],
          allowClear: true,
          disabledDate: disabledDateAfterToday
        }
      },
      fieldOption: regisDateRangeConfig
    },
    {
      id: 'vehicleNo',
      label: '차량번호',
      colProps: {
        span: 8,
        xs: 24,
        md: 24,
        xl: 8
      },
      formItemProps: {
        labelCol: {
          xl: 5,
          xs: 5
        },
        wrapperCol: {
          xl: 10,
          xs: 10
        }
      },
      component: {
        type: FormType.Input,
        option: {
          placeholder: '입력하세요'
        }
      }
    }
  ];
}
