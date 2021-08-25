import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import {
  createParkinglotInout,
  deleteParkinglotInout,
  editParkinglotInout,
  getInouts
} from '@/api/Inout';
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
import {
  conversionDate,
  conversionDateTime,
  conversionEnumValue,
  convertNumberWithCommas
} from '@utils/conversion';
import { EInoutType, ETicketType, ticketTypeOpt } from '@/constants/list';
import moment from 'moment';
import DraggableModal from '@/components/DraggableModal';
import InoutCreateModalForm from '@/views/Inout/Modal/InoutCreateModal';
import InoutDetailModalForm from './Modal/InoutDetailModal';
import { parkinglotStore } from '@/store/parkinglotStore';
import { ITicketObj } from '@models/ticket';
import { DownloadOutlined } from '@ant-design/icons';
import { generateCsv } from '@utils/downloadUtil';

interface IState {
  loading: boolean;
  list: IInoutObj[];
  current: number;
  pageSize: number;
  total: number;
  createModal: boolean;
  detailModal: boolean;
  searchParam?: IInoutSelectReq;
  gates: any[];
  selected?: IInoutObj;
  deleteList: any[];
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
      gates: [],
      detailModal: false,
      deleteList: []
    };
  }

  componentDidMount() {
    parkinglotStore.initGateList().then(() => {
      const unique: { value: string; label: string }[] = [];
      parkinglotStore.gateList.forEach((gate) => {
        unique.push({ value: gate.gateId, label: gate.gateName });
      });
      this.setState({ gates: unique });
    });
    const createTm = [moment(new Date()).subtract(3, 'days'), moment(new Date())];
    const searchParam: IInoutSelectReq = {
      startDate: createTm[0].format('YYYY-MM-DD'),
      endDate: createTm[1].format('YYYY-MM-DD'),
      createTm: [createTm[0].unix(), createTm[1].unix()],
      dateType: EInoutType.IN
    };
    this.setState(
      {
        searchParam: searchParam
      },
      () => this.pollData()
    );
  }

  update = (info: IInoutObj) => {
    this.setState({ detailModal: false });
    editParkinglotInout(info).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        this.pollData();
      }
    });
  };

  async delete() {
    let count = 0;
    this.state.deleteList.forEach((data: any) => {
      deleteParkinglotInout(data.parkinSn).then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            count++;
            if (count === this.state.deleteList.length) {
              this.setState({ deleteList: [] });
              this.pollData();
            }
          });
        }
      });
    });
    await this.pollData();
  }

  async pollData() {
    this.setState({ loading: true });
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
    console.log('getSearchData', info);
    const searchParam: IInoutSelectReq = {
      dateType: info.dateType,
      startDate: conversionDate(info.createTm[0]), //info.createTm[0].format('YYYY-MM-DD'),
      endDate: conversionDate(info.createTm[1]), //info.createTm[1].format('YYYY-MM-DD'),
      createTm: info.createTm,
      vehicleNo: info.vehicleNo,
      parkcartype: info.parkcartype
    };
    this.setState({ searchParam: searchParam, current: 1 }, () => this.pollData());
  };

  create = (info: IInoutObj) => {
    this.setState({ createModal: false });
    createParkinglotInout(info).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        this.pollData();
      }
    });
  };

  paginationChange = (pagination: TablePaginationConfig) => {
    this.setState({ current: pagination.current || 1 });
  };

  addProdRender = () => {
    const { localeObj } = localeStore;
    return (
      <>
        <Button
          type="primary"
          onClick={(e: any) => {
            e.stopPropagation();
            this.handleCreateClick();
          }}
        >
          + {localeObj['label.create'] || '신규 등록'}
        </Button>
        <Button
          type="ghost"
          onClick={(e: any) => {
            e.stopPropagation();
            this.delete();
          }}
          style={{ marginLeft: '1rem' }}
        >
          -{localeObj['label.delete'] || '삭제'}
        </Button>
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
      </>
    );
  };

  handleCreateClick = () => {
    this.setState({ createModal: true });
  };

  async handleDownloadClick() {
    const headers = [
      '주차상태',
      '차량타입',
      '회사명',
      '차량번호',
      '입차게이트',
      '입차시간',
      '출차게이트',
      '출차시간',
      '주차요금',
      '할인요금',
      '결제요금',
      '메모'
    ].join(',');

    const downLoadData = this.state.list.map((inout) => {
      const data: any = {};
      data.parkType =
        inout.parkoutSn === -1 ? '이중입차' : inout.parkoutSn !== 0 ? '차량출차' : '차량입차';
      data.ticketType = conversionEnumValue(inout.parkcartype, ticketTypeOpt).label;
      data.corpName = inout.ticketCorpName;
      data.vehicleNo = inout.vehicleNo;
      data.inGate = inout.inGateId;
      data.inDate = conversionDateTime(inout.inDate, '{y}-{m}-{d} {h}:{i}') || '--';
      data.outGate = inout.outGateId;
      data.outDate = inout.outDate
        ? conversionDateTime(inout.outDate, '{y}-{m}-{d} {h}:{i}') || '--'
        : null;
      data.parkfee = inout.parkfee;
      data.discountfee = inout.discountfee;
      data.payfee = inout.payfee;
      data.memo = inout.memo;
      return data;
    });

    await generateCsv(downLoadData, headers, '입출차현황');
  }

  handleBtnClick = (info: IInoutObj) => {
    this.setState({ detailModal: true, createModal: false, selected: info });
  };

  sum = (array: any[], key: string) => {
    return array.reduce((sum, item) => {
      return (sum += item[key]);
    }, 0);
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
        sorter: (a, b) => {
          let atime = new Date(a.inDate).getTime();
          let btime = new Date(b.inDate).getTime();
          return atime - btime;
        },
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
          onSelectRow={(row: ITicketObj[]) => {
            this.setState({ deleteList: row });
          }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}></Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>Total: {total}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>
                    일반: {list.filter((l) => l.parkcartype === ETicketType.NORMAL).length}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>
                    정기권: {list.filter((l) => l.parkcartype === ETicketType.SEASONTICKET).length}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>
                    방문권: {list.filter((l) => l.parkcartype === ETicketType.VISITTICKET).length}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>
                    미인식: {list.filter((l) => l.parkcartype === ETicketType.UNRECOGNIZED).length}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6}></Table.Summary.Cell>
                <Table.Summary.Cell index={7}></Table.Summary.Cell>
                <Table.Summary.Cell index={8}></Table.Summary.Cell>
                <Table.Summary.Cell index={9}></Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>
                    {convertNumberWithCommas(this.sum(list, 'parkfee'))}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={11}>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>
                    {convertNumberWithCommas(
                      this.sum(list, 'discountfee') + this.sum(list, 'dayDiscountfee')
                    )}
                  </span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
          onChange={this.paginationChange}
          isSelected
        />
        {this.state.createModal ? (
          <DraggableModal
            title={localeObj['label.inout.create'] || '입출차 등록'}
            visible={this.state.createModal}
            width={800}
            onOk={() => this.setState({ createModal: false })}
            onCancel={(): void => {
              this.setState({ createModal: false });
            }}
          >
            <InoutCreateModalForm
              onSubmit={(value) => this.create(value)}
              gates={this.state.gates}
            />
          </DraggableModal>
        ) : null}
        {this.state.detailModal ? (
          <DraggableModal
            title={localeObj['label.inout.detail'] || '입출차 상세 내역'}
            visible={this.state.detailModal}
            width={800}
            onOk={() => this.setState({ detailModal: false })}
            onCancel={(): void => {
              this.setState({ detailModal: false });
            }}
          >
            <InoutDetailModalForm
              onSubmit={(value) => this.update(value)}
              inout={this.state.selected!!}
              gates={this.state.gates}
            />
          </DraggableModal>
        ) : null}
      </PageWrapper>
    );
  }
}

export default Inout;
