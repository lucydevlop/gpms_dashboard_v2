import React, { PureComponent } from 'react';
import Table, { ColumnProps } from 'antd/lib/table';
import { IStatisticsInoutDayObj, IStatisticsInoutDaySearchReq } from '@models/statisticsInout';
import { getInoutByDay } from '@api/statistics';
import { runInAction } from 'mobx';
import moment from 'moment';
import { conversionDate } from '@utils/conversion';
import SearchForm from '@components/StandardTable/SearchForm';
import StandardTable from '@components/StandardTable';
import { searchStatisticsInoutDayFields } from '@views/Statistics/Inout/tabs/inoutFields';

interface IProps {}
interface IState {
  loading: boolean;
  list: IStatisticsInoutDayObj[];
  total: number;
  current: number;
  pageSize: number;
  searchParam?: IStatisticsInoutDaySearchReq;
}

class InoutByDay extends PureComponent<IProps, IState> {
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
    const createTm = [moment(new Date()).subtract(7, 'days'), moment(new Date())];
    const searchParam: IStatisticsInoutDaySearchReq = {
      startDate: createTm[0].format('YYYY-MM-DD'),
      endDate: createTm[1].format('YYYY-MM-DD'),
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
    getInoutByDay(this.state.searchParam)
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
        align: 'center'
      },
      {
        title: '입차',
        children: [
          {
            title: '총건수',
            dataIndex: 'inCnt',
            key: 'inCnt',
            width: 110,
            align: 'center'
          },
          {
            title: '일반차량',
            dataIndex: 'normalCnt',
            key: 'normalCnt',
            width: 110,
            align: 'center'
          },
          {
            title: '정기권차량',
            dataIndex: 'ticketCnt',
            key: 'ticketCnt',
            width: 110,
            align: 'center'
          },
          {
            title: '미인식차량',
            dataIndex: 'unrecognizedCnt',
            key: 'unrecognizedCnt',
            width: 110,
            align: 'center'
          }
        ]
      },
      {
        title: '출차',
        children: [
          {
            title: '총건수',
            dataIndex: 'outCnt',
            key: 'outCnt',
            width: 110,
            align: 'center'
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
            render: (text: string, record: IStatisticsInoutDayObj) => {
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
          }
        ]
      }
    ];
    const { list, total, current, pageSize } = this.state;
    const searchFields = searchStatisticsInoutDayFields();

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
          rowKey={(record: IStatisticsInoutDayObj) => String(record.date)}
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
                  <span>{this.sum(list, 'inCnt')}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <span>{this.sum(list, 'normalCnt')}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <span>{this.sum(list, 'ticketCnt')}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <span>{this.sum(list, 'unrecognizedCnt')}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  <span>{this.sum(list, 'outCnt')}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6}>
                  <span>{this.sum(list, 'parkFee')}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7}>
                  <span>{this.sum(list, 'discountFee') + this.sum(list, 'dayDiscountFee')}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={8}>
                  <span>{this.sum(list, 'payFee')}</span>
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

export default InoutByDay;
