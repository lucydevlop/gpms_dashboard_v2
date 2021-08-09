import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { getInouts } from '@/api/Inout';
import { IInoutObj, IInoutSelectReq } from '@models/inout';
import { runInAction } from 'mobx';
import Table, { ColumnProps } from 'antd/lib/table';
import { localeStore } from '@/store/localeStore';
import PageWrapper from '@/components/PageWrapper';
import SearchForm from '@/components/StandardTable/SearchForm';
import StandardTable from '@/components/StandardTable';
import { TablePaginationConfig } from 'antd/es/table';
import { Button } from 'antd';
import { searchInoutFields } from '@views/Inout/FormFields/FormFields';
import { conversionDate, conversionDateTime, conversionEnumValue } from '@utils/conversion';
import { EInoutType, ticketTypeOpt } from '@/constants/list';
import moment from 'moment';

interface IState {
  loading: boolean;
  list: IInoutObj[];
  current: number;
  pageSize: number;
  total: number;
  createModal: boolean;
  detailModal: boolean;
  searchParam?: IInoutSelectReq;
  selected?: IInoutObj;
}
@inject('parkinglotStore', 'localeStore')
@observer
class Inout extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      list: [],
      total: 0,
      current: 1,
      pageSize: 20,
      createModal: false,
      detailModal: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const createTm = [moment(new Date()).subtract(3, 'days'), moment(new Date())];
    const searchParam: IInoutSelectReq = {
      startDate: createTm[0].format('YYYY-MM-DD'),
      endDate: createTm[1].format('YYYY-MM-DD'),
      createTm: [createTm[0].unix(), createTm[1].unix()],
      dateType: EInoutType.IN
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
    getInouts(this.state.searchParam)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ list: data, total: data.length });
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
      dateType: info.dateType,
      startDate: conversionDate(info.createTm[0]), //info.createTm[0].format('YYYY-MM-DD'),
      endDate: conversionDate(info.createTm[1]), //info.createTm[1].format('YYYY-MM-DD'),
      createTm: info.createTm,
      vehicleNo: info.vehicleNo
    };
    this.setState({ searchParam: searchParam, current: 1 }, () => this.pollData());
  };

  paginationChange = (pagination: TablePaginationConfig) => {
    this.setState({ current: pagination.current || 1 });
  };

  addProdRender = () => {
    const { localeObj } = localeStore;
    return (
      <Button
        type="primary"
        onClick={(e: any) => {
          e.stopPropagation();
          this.handleCreateClick();
        }}
      >
        + {localeObj['label.create'] || '신규 등록'}
      </Button>
    );
  };

  handleCreateClick = () => {
    this.setState({ createModal: true });
  };

  handleBtnClick = (info: IInoutObj) => {
    //console.log('handleBtnClick', info);
    this.setState({ detailModal: true, createModal: false, selected: info });
  };

  render() {
    const { localeObj } = localeStore;
    const columns: ColumnProps<IInoutObj>[] = [
      {
        title: '차량번호',
        key: 'vehicleNo',
        fixed: 'left',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutObj) => record.vehicleNo
      },
      {
        title: '주차상태',
        key: 'type',
        // fixed: 'left',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutObj) => {
          const status =
            record.parkoutSn === -1 ? '이중입차' : record.parkoutSn !== 0 ? '차량출차' : '차량입차';
          return {
            props: {
              style: {
                color: status === '이중입차' ? 'red' : status === '차량출차' ? 'blue' : 'black'
              }
            },
            children: <div>{status}</div>
          };
        }
      },
      {
        title: '차량상태',
        key: 'parkcartype',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutObj) => {
          const type = conversionEnumValue(record.parkcartype, ticketTypeOpt);
          return {
            props: {
              style: {
                color: type.color
              }
            },
            children: <div>{type.label}</div>
          };
        }
      },
      {
        title: '회사명',
        key: 'ticketCorpName',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutObj) => record.ticketCorpName
      },
      {
        title: '입차Gate',
        key: 'inGateId',
        width: 100,
        align: 'center',
        render: (text: string, record: IInoutObj) => record.inGateId
      },
      {
        title: '입차시간',
        key: 'inDate',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutObj) =>
          conversionDateTime(record.inDate, '{y}-{m}-{d} {h}:{i}') || '--'
      },
      {
        title: '출차Gate',
        key: 'outGateId',
        width: 100,
        align: 'center',
        render: (text: string, record: IInoutObj) => record.outGateId
      },
      {
        title: '출차시간',
        key: 'outDate',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutObj) => {
          return record.outDate
            ? conversionDateTime(record.outDate, '{y}-{m}-{d} {h}:{i}') || '--'
            : null;
        }
      },
      {
        title: '주차시간(분)',
        key: 'parktime',
        width: 100,
        align: 'center',
        render: (text: string, record: IInoutObj) => record.parktime
      },
      {
        title: '주차요금',
        key: 'parkfee',
        width: 100,
        align: 'center',
        render: (text: string, record: IInoutObj) => record.parkfee
      },
      {
        title: '할인요금',
        key: 'discountfee',
        width: 100,
        align: 'center',
        render: (text: string, record: IInoutObj) => (
          <span>{record.discountfee!! + record.dayDiscountfee!!}</span>
        )
      },
      {
        title: '결제요금',
        key: 'payfee',
        width: 100,
        align: 'center',
        render: (text: string, record: IInoutObj) => (
          <span>
            {record.payfee === record.paymentAmount ? (
              record.paymentAmount
            ) : (
              <span style={{ color: 'red' }}>{record.payfee}</span>
            )}
          </span>
        )
      },
      {
        title: '메모',
        key: 'memo',
        width: 100,
        align: 'center',
        render: (text: string, record: IInoutObj) => record.memo
      },
      {
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: IInoutObj) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item);
              }}
            >
              상세
            </a>
          </div>
        )
      }
    ];
    const { list, total, current, pageSize } = this.state;
    const searchFields = searchInoutFields();

    return (
      <PageWrapper>
        <SearchForm
          submit={(value) => this.getSearchData(value)}
          location={this.props.location}
          footerRender={() => this.addProdRender()}
          fieldConfig={searchFields}
        />
        <StandardTable
          scroll={{ x: 'max-content' }}
          columns={columns}
          loading={this.state.loading}
          // @ts-ignore
          rowKey={(record: IInoutObj) => String(record.parkinSn)}
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
                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>Total: {total}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>{total}</Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
          onChange={this.paginationChange}
          isSelected
        />
      </PageWrapper>
    );
  }
}

export default Inout;
