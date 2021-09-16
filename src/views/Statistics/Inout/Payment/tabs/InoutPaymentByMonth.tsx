import React, { PureComponent } from 'react';
import Table, { ColumnProps } from 'antd/lib/table';
import {
  IStatisticsInoutCountObj,
  IStatisticsInoutDaySearchReq,
  IStatisticsInoutPaymentObj
} from '@models/statisticsInout';
import { getInoutByDay, getInoutPaymentByDay, getInoutPaymentByMonth } from '@api/statistics';
import { runInAction } from 'mobx';
import moment from 'moment';
import { conversionDate, convertNumberWithCommas } from '@utils/conversion';
import SearchForm from '@components/StandardTable/SearchForm';
import StandardTable from '@components/StandardTable';
import {
  searchStatisticsInoutDayFields,
  searchStatisticsInoutMonthFields
} from '@views/Statistics/Inout/Count/tabs/inoutFields';

interface IProps {}
interface IState {
  loading: boolean;
  list: IStatisticsInoutPaymentObj[];
  total: number;
  current: number;
  pageSize: number;
  searchParam?: IStatisticsInoutDaySearchReq;
}

class InoutPaymentByMonth extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      list: [],
      total: 0,
      current: 1,
      pageSize: 20
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    const createTm = [moment(new Date()).subtract(7, 'months'), moment(new Date())];
    const searchParam: IStatisticsInoutDaySearchReq = {
      startDate: createTm[0].format('YYYY-MM-01'),
      endDate: createTm[1].format('YYYY-MM-') + createTm[1].daysInMonth(),
      createTm: [createTm[0].unix(), createTm[1].unix()]
    };
    // console.log('pollData', searchParam);
    this.setState(
      {
        searchParam: searchParam
      },
      () => this.pollData()
    );
  }

  async pollData() {
    getInoutPaymentByMonth(this.state.searchParam)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ list: data, total: data.length });
            console.log(this.state.list);
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  getSearchData = (info: IStatisticsInoutDaySearchReq) => {
    const searchParam: IStatisticsInoutDaySearchReq = {
      startDate: conversionDate(info.createTm[0]), //info.createTm[0].format('YYYY-MM-DD'),
      endDate: conversionDate(info.createTm[1]), //info.createTm[1].format('YYYY-MM-DD'),
      createTm: info.createTm
    };
    this.setState({ searchParam: searchParam, current: 1 }, () => this.pollData());
  };

  sum = (array: any[], key: string) => {
    return array.reduce((sum, item) => {
      return (sum += item[key]);
    }, 0);
  };

  render() {
    const columns = [
      {
        title: '날짜',
        dataIndex: 'date',
        key: 'date',
        width: 110,
        align: 'center',
        render: (text: string, record: IStatisticsInoutCountObj) => record.date.substring(0, 7)
      },
      {
        title: '주차요금',
        dataIndex: 'parkFee',
        key: 'parkFee',
        width: 110,
        align: 'center'
      },
      {
        title: '할인요금',
        // dataIndex: 'parkFee',
        key: 'discountFee',
        width: 110,
        align: 'center',
        render: (text: string, record: IStatisticsInoutPaymentObj) => {
          const discountFee = record.discountFee ? record.discountFee : 0;
          const dayDiscountFee = record.dayDiscountFee ? record.dayDiscountFee : 0;
          return discountFee + dayDiscountFee;
        }
      },
      {
        title: '결제요금',
        dataIndex: 'payFee',
        key: 'payFee',
        width: 110,
        align: 'center'
      },
      {
        title: '미납요금',
        dataIndex: 'nonPayment',
        key: 'nonPayment',
        width: 110,
        align: 'center'
      },
      {
        title: '정산요금',
        dataIndex: 'payment',
        key: 'payment',
        width: 110,
        align: 'center'
      }
    ];

    const { list, total, current, pageSize } = this.state;
    const searchFields = searchStatisticsInoutMonthFields();

    return (
      <>
        <SearchForm
          submit={(value) => this.getSearchData(value)}
          // location={this.props.location}
          // footerRender={() => this.addProdRender()}
          fieldConfig={searchFields}
        />
        <StandardTable
          scroll={{ x: 'max-content' }}
          columns={columns}
          loading={this.state.loading}
          // @ts-ignore
          rowKey={(record: IStatisticsInoutCountObj) => String(record.date)}
          data={{
            list
          }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row style={{ textAlign: 'center', fontSize: '15px', fontWeight: 600 }}>
                <Table.Summary.Cell index={0}>
                  <span>Total: {total}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <span>{convertNumberWithCommas(this.sum(list, 'parkFee'))}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <span>
                    {convertNumberWithCommas(
                      this.sum(list, 'discountFee') + this.sum(list, 'dayDiscountFee')
                    )}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <span>{convertNumberWithCommas(this.sum(list, 'payFee'))}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <span>{convertNumberWithCommas(this.sum(list, 'nonPayment'))}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  <span>{convertNumberWithCommas(this.sum(list, 'payment'))}</span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
          bordered
          // onChange={this.paginationChange}
          // isSelected
        />
      </>
    );
  }
}

export default InoutPaymentByMonth;
