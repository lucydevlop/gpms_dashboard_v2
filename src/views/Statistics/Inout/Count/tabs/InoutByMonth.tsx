import React, { PureComponent } from 'react';
import { IStatisticsInoutCountObj, IStatisticsInoutDaySearchReq } from '@models/statisticsInout';
import moment from 'moment';
import { getInoutByMonth } from '@api/statistics';
import { runInAction } from 'mobx';
import { conversionDate, convertNumberWithCommas } from '@utils/conversion';
import { searchStatisticsInoutMonthFields } from '@views/Statistics/Inout/Count/tabs/inoutFields';
import SearchForm from '@components/StandardTable/SearchForm';
import StandardTable from '@components/StandardTable';
import Table from 'antd/lib/table';
import { localeStore } from '@store/localeStore';
import { Button, Col, Row } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { generateCsv } from '@utils/downloadUtil';

interface IProps {}
interface IState {
  loading: boolean;
  list: IStatisticsInoutCountObj[];
  total: number;
  current: number;
  pageSize: number;
  searchParam?: IStatisticsInoutDaySearchReq;
}

class InoutByMonth extends PureComponent<IProps, IState> {
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
    getInoutByMonth(this.state.searchParam)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ list: data, total: data.length });
            //console.log(this.state.list);
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

  addProdRender = () => {
    const { localeObj } = localeStore;
    return (
      <Row>
        <Col xs={7}>
          <Button
            style={{ marginLeft: '1rem' }}
            type="primary"
            onClick={(e: any) => {
              e.stopPropagation();
              this.handleDownloadClick();
            }}
          >
            <DownloadOutlined /> {localeObj['label.download'] || '다운로드'}
          </Button>
        </Col>
      </Row>
    );
  };

  async handleDownloadClick() {
    const headers = [
      '날짜',
      '입차 총건수',
      '입차 일반차량',
      '입차 정기권차량',
      '입차 미인식차량',
      '출차 총건수',
      '출차 일반차량',
      '출차 정기권차량',
      '출차 미인식차량'
    ].join(',');

    const downLoadData = this.state.list.map((s) => {
      const data: any = {};
      data.date = s.date.substring(0, 7);
      data.inCnt = s.inCnt;
      data.inNormalCnt = s.inNormalCnt;
      data.inTicketCnt = s.inTicketCnt;
      data.inUnrecognizedCnt = s.inUnrecognizedCnt;
      data.outCnt = s.outCnt;
      data.outNormalCnt = s.outNormalCnt;
      data.outTicketCnt = s.outTicketCnt;
      data.outUnrecognizedCnt = s.outUnrecognizedCnt;
      return data;
    });
    downLoadData.push({
      date: 'Total',
      inCnt: this.sum(this.state.list, 'inCnt'),
      inNormalCnt: this.sum(this.state.list, 'inNormalCnt'),
      inTicketCnt: this.sum(this.state.list, 'inTicketCnt'),
      inUnrecognizedCnt: this.sum(this.state.list, 'inUnrecognizedCnt'),
      outCnt: this.sum(this.state.list, 'outCnt'),
      outNormalCnt: this.sum(this.state.list, 'outNormalCnt'),
      outTicketCnt: this.sum(this.state.list, 'outTicketCnt'),
      outUnrecognizedCnt: this.sum(this.state.list, 'outUnrecognizedCnt')
    });
    await generateCsv(downLoadData, headers, '입출차현황(월별)');
  }

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
            dataIndex: 'inNormalCnt',
            key: 'inNormalCnt',
            width: 110,
            align: 'center'
          },
          {
            title: '정기권차량',
            dataIndex: 'inTicketCnt',
            key: 'inTicketCnt',
            width: 110,
            align: 'center'
          },
          {
            title: '미인식차량',
            dataIndex: 'inUnrecognizedCnt',
            key: 'inUnrecognizedCnt',
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
            title: '일반차량',
            dataIndex: 'outNormalCnt',
            key: 'outNormalCnt',
            width: 110,
            align: 'center'
          },
          {
            title: '정기권차량',
            dataIndex: 'outTicketCnt',
            key: 'outTicketCnt',
            width: 110,
            align: 'center'
          },
          {
            title: '미인식차량',
            dataIndex: 'outUnrecognizedCnt',
            key: 'outUnrecognizedCnt',
            width: 110,
            align: 'center'
          }
        ]
      }
    ];
    const { list, total, current, pageSize } = this.state;
    const searchFields = searchStatisticsInoutMonthFields();

    return (
      <>
        <SearchForm
          submit={(value) => this.getSearchData(value)}
          // location={this.props.location}
          footerRender={() => this.addProdRender()}
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
                  <span>{this.sum(list, 'inCnt')}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <span>{this.sum(list, 'inNormalCnt')}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <span>{this.sum(list, 'inTicketCnt')}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <span>{this.sum(list, 'inUnrecognizedCnt')}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  <span>{this.sum(list, 'outCnt')}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6}>
                  <span>{this.sum(list, 'outNormalCnt')}</span>
                  {/*<span>{convertNumberWithCommas(this.sum(list, 'parkFee'))}</span>*/}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={7}>
                  <span>{this.sum(list, 'outTicketCnt')}</span>
                  {/*<span>*/}
                  {/*  {convertNumberWithCommas(*/}
                  {/*    this.sum(list, 'discountFee') + this.sum(list, 'dayDiscountFee')*/}
                  {/*  )}*/}
                  {/*</span>*/}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={8}>
                  {/*<span>{convertNumberWithCommas(this.sum(list, 'payFee'))}</span>*/}
                  <span>{this.sum(list, 'outUnrecognizedCnt')}</span>
                </Table.Summary.Cell>
                {/*<Table.Summary.Cell index={9}>*/}
                {/*  <span>{convertNumberWithCommas(this.sum(list, 'nonPayment'))}</span>*/}
                {/*</Table.Summary.Cell>*/}
                {/*<Table.Summary.Cell index={10}>*/}
                {/*  <span>{convertNumberWithCommas(this.sum(list, 'payment'))}</span>*/}
                {/*</Table.Summary.Cell>*/}
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

export default InoutByMonth;
