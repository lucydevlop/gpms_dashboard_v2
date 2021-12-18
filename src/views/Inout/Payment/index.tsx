import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { IInoutObj, IInoutSelectReq } from '@models/inout';
import moment from 'moment';
import { delYnOpt, EInoutType, ETicketType, paymentTypeOpt, resultTypeOpt } from '@/constants/list';
import { getInoutPayment } from '@api/Inout';
import { runInAction } from 'mobx';
import { IInoutPaymentObj } from '@models/inoutPayment';
import Table, { ColumnProps } from 'antd/lib/table';
import {
  conversionDate,
  conversionEnumValue,
  convertNumberWithCommas,
  convertStringToDateTime
} from '@utils/conversion';
import { searchInoutPaymentFields } from '@views/Inout/List/FormFields/FormFields';
import PageWrapper from '@components/PageWrapper';
import SearchForm from '@components/StandardTable/SearchForm';
import StandardTable from '@components/StandardTable';
import { TablePaginationConfig } from 'antd/es/table';
import { localeStore } from '@store/localeStore';
import { Button, Col, Row } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { generateCsv } from '@utils/downloadUtil';

interface IState {
  loading: boolean;
  searchParam?: IInoutSelectReq;
  list: IInoutPaymentObj[];
  current: number;
  pageSize: number;
  total: number;
}

@inject('parkinglotStore', 'localeStore')
@observer
class InoutPayment extends PureComponent<any, IState> {
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
    const createTm = [moment(new Date()).subtract(3, 'days'), moment(new Date())];
    const searchParam: IInoutSelectReq = {
      startDate: createTm[0].format('YYYY-MM-DD'),
      endDate: createTm[1].format('YYYY-MM-DD'),
      createTm: [createTm[0].unix(), createTm[1].unix()],
      dateType: EInoutType.IN,
      vehicleNo: '',
      outSn: ''
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
    getInoutPayment(this.state.searchParam)
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

  getSearchData = (info: IInoutSelectReq) => {
    // console.log('getSearchData', info);
    const searchParam: IInoutSelectReq = {
      outSn: '',
      dateType: info.dateType,
      startDate: conversionDate(info.createTm[0]), //info.createTm[0].format('YYYY-MM-DD'),
      endDate: conversionDate(info.createTm[1]), //info.createTm[1].format('YYYY-MM-DD'),
      createTm: info.createTm,
      vehicleNo: info.vehicleNo === undefined ? '' : info.vehicleNo
    };
    this.setState({ searchParam: searchParam, current: 1 }, () => this.pollData());
  };

  paginationChange = (pagination: TablePaginationConfig) => {
    this.setState({ current: pagination.current || 1 });
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
      '차량번호',
      '정산타입',
      '결제일자',
      '결제금액',
      '결제방법',
      '카드',
      '카드번호',
      '승인번호',
      '결제여부'
    ].join(',');

    const downLoadData = this.state.list.map((record) => {
      const data: any = {};
      data.vehicleNo = record.vehicleNo;
      data.type = conversionEnumValue(record.type, paymentTypeOpt).label;
      data.approveDateTime = convertStringToDateTime(record.approveDateTime) || '--';
      data.amount = record.amount;
      data.payType = record.payType;
      data.cardCorp = record.cardCorp;
      data.cardNumber = record.cardNumber;
      data.transactionId = record.transactionId;
      data.result = record.result === 'SUCCESS' ? '성공' : `실패(${record.failureMessage})`;
      return data;
    });
    downLoadData.push({
      vehicleNo: '',
      type: '',
      approveDateTime: '',
      amount: this.sum(this.state.list, 'amount'),
      payType: '',
      cardCorp: '',
      cardNumber: '',
      transactionId: '',
      result: ''
    });
    await generateCsv(downLoadData, headers, '입출차결제현황');
  }

  sum = (array: any[], key: string) => {
    return array.reduce((sum, item) => {
      return (sum += item[key]);
    }, 0);
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
        render: (text: string, record: IInoutPaymentObj) => record.amount
      },
      {
        title: '결제방법',
        key: 'payType',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => record.payType
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
        title: '승인번호',
        key: 'transactionId',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => record.transactionId
      },
      {
        title: '결제여부',
        key: 'result',
        width: 110,
        align: 'center',
        filters: resultTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.result.indexOf(value as string) === 0,
        render: (text: string, record: IInoutPaymentObj) => {
          const result = conversionEnumValue(record.result, resultTypeOpt).label;
          return record.result === 'ERROR' || result === 'FAILURE'
            ? `${result}(${record.failureMessage})`
            : result;
        }
      }
    ];
    const { list, total, current, pageSize } = this.state;
    const searchFields = searchInoutPaymentFields();
    return (
      <PageWrapper>
        <SearchForm
          submit={(value) => this.getSearchData(value)}
          location={this.props.location}
          fieldConfig={searchFields}
          footerRender={() => this.addProdRender()}
        />
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
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>Total: {total}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} />
                <Table.Summary.Cell index={2} />
                <Table.Summary.Cell index={3}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    {convertNumberWithCommas(this.sum(list, 'amount'))}
                  </span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
          onChange={this.paginationChange}
          // isSelected
        />
      </PageWrapper>
    );
  }
}

export default InoutPayment;
