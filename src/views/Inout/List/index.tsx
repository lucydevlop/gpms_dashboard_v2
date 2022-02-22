import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import {
  calcParkinglotInout,
  createParkinglotInout,
  deleteParkinglotInout,
  getInoutDetail,
  getInouts,
  transferParkinglotInout,
  updateParkinglotInout
} from '@api/Inout';
import { IInoutObj, IInoutSelectReq } from '@models/inout';
import { runInAction } from 'mobx';
import Table, { ColumnProps } from 'antd/lib/table';
import { localeStore } from '@store/localeStore';
import PageWrapper from '@components/PageWrapper';
import SearchForm from '@components/StandardTable/SearchForm';
import StandardTable from '@components/StandardTable';
import { TablePaginationConfig } from 'antd/es/table';
import { Button, Divider } from 'antd';
import { searchInoutFields } from '@views/Inout/List/FormFields/FormFields';
import {
  conversionDate,
  conversionDateTime,
  conversionEnumValue,
  convertNumberWithCommas
} from '@utils/conversion';
import { EDelYn, EInoutType, ETicketType, ticketTypeOpt } from '@/constants/list';
import moment from 'moment';
import DraggableModal from '@components/DraggableModal';
import InoutCreateModalForm from '@views/Inout/List/Modal/InoutCreateModal';
import InoutDetailModalForm from './Modal/InoutDetailModal';
import { parkinglotStore } from '@store/parkinglotStore';
import { DownloadOutlined } from '@ant-design/icons';
import { generateCsv } from '@utils/downloadUtil';
import { getDiscountClasses } from '@api/discountClass';
import { IDiscountClassObj } from '@models/discountClass';
import zdsTips from '@utils/tips';

interface IState {
  loading: boolean;
  list: IInoutObj[];
  current: number;
  pageSize: number;
  total: number;
  createModal: boolean;
  detailModal: boolean;
  searchParam?: IInoutSelectReq;
  inGates: any[];
  outGates: any[];
  selected?: IInoutObj;
  deleteList: any[];
  discountClasses: IDiscountClassObj[];
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
      inGates: [],
      outGates: [],
      detailModal: false,
      deleteList: [],
      discountClasses: []
    };
  }

  componentDidMount() {
    this.setState({ inGates: parkinglotStore.getInGates });
    this.setState({ outGates: parkinglotStore.getOutGates });

    getDiscountClasses()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ discountClasses: data });
          });
        }
      })
      .catch(() => {});

    const createTm = [moment(new Date()).subtract(3, 'days'), moment(new Date())];
    const searchParam: IInoutSelectReq = {
      startDate: createTm[0].format('YYYY-MM-DD'),
      endDate: createTm[1].format('YYYY-MM-DD'),
      createTm: [createTm[0].unix(), createTm[1].unix()],
      dateType: EInoutType.IN,
      vehicleNo: '',
      parkcartype: ETicketType.ALL,
      outSn: ''
    };
    this.setState(
      {
        searchParam: searchParam
      },
      () => this.pollData()
    );
  }

  update = (info: IInoutObj) => {
    // this.setState({ detailModal: false });
    updateParkinglotInout(info).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        this.setState({ selected: data }, () => this.pollData());
      }
    });
  };

  transfer = (info: IInoutObj) => {
    // this.setState({ detailModal: false });
    transferParkinglotInout(info).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        zdsTips.success('주차요금 전송 완료했습니다');
        this.setState({ selected: data }, () => this.pollData());
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
    const { current, pageSize } = this.state;

    getInouts(this.state.searchParam, current, pageSize)
      .then((res: any) => {
        const { msg, data, total } = res;
        if (msg === 'success') {
          runInAction(() => {
            // console.log(data);
            this.setState({ list: data, total: total });
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
      vehicleNo: info.vehicleNo === undefined ? '' : info.vehicleNo,
      parkcartype: info.parkcartype,
      outSn: ''
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

  calc = (info: IInoutObj) => {
    // console.log('calc', info);
    calcParkinglotInout(info).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        this.setState({ selected: data });
      }
    });
  };

  paginationChange = (pagination: TablePaginationConfig) => {
    this.setState({ current: pagination.current || 1 }, () => this.pollData());
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
      '기본요금',
      '할인요금',
      '주차요금',
      '결제요금',
      '미납요금',
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
      data.discountfee = inout.discountfee!! + inout.dayDiscountfee!!;
      data.payfee = inout.payfee;
      data.paymentAmount = inout.paymentAmount;
      data.nonPayment = inout.nonPayment;
      data.memo = inout.memo;
      return data;
    });

    await generateCsv(downLoadData, headers, '입출차현황');
  }

  handleBtnClick = (info: IInoutObj, key: string) => {
    if (key === 'DELETE') {
      zdsTips.confirm('강제출차 하시겠습니까?', () => {
        deleteParkinglotInout(info.parkinSn).then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              this.pollData();
            });
          }
        });
      });
    } else {
      getInoutDetail(info.parkinSn)
        .then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              // console.log(data);
              this.setState({ selected: data });
            });
          }
        })
        .catch(() => {})
        .finally(() => {
          this.setState({ loading: false, detailModal: true, createModal: false });
        });
    }
    // this.setState({ detailModal: true, createModal: false });
  };

  sum = (array: any[], key: string) => {
    return array.reduce((sum, item) => {
      return (sum += item[key]);
    }, 0);
  };

  handleKeyDown = (e: any) => {
    if (e.key === 'Enter') this.getSearchData(e.target.value);
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
            record.parkoutSn === -1
              ? '이중입차'
              : record.parkoutSn !== 0 && record.parkoutSn !== null
              ? '차량출차'
              : '차량입차';
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
          moment(record.inDate).format('YYYY-MM-DD HH:mm')
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
          return record.outDate ? moment(record.outDate).format('YYYY-MM-DD HH:mm') : null;
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
        title: '기본요금',
        key: 'parkfee',
        width: 100,
        align: 'center',
        render: (text: string, record: IInoutObj) => convertNumberWithCommas(record.parkfee)
      },
      {
        title: '할인요금',
        key: 'discountfee',
        width: 100,
        align: 'center',
        render: (text: string, record: IInoutObj) => (
          <span>{convertNumberWithCommas(record.discountfee!! + record.dayDiscountfee!!)}</span>
        )
      },
      {
        title: '주차요금',
        key: 'payfee',
        width: 100,
        align: 'center',
        render: (text: string, record: IInoutObj) => (
          <span>{convertNumberWithCommas(record.payfee)}</span>
        )
      },
      {
        title: '결제요금',
        key: 'payfee',
        width: 100,
        align: 'center',
        render: (text: string, record: IInoutObj) => (
          <span>{convertNumberWithCommas(record.paymentAmount)}</span>
        )
      },
      {
        title: '미납요금',
        key: 'nonPayment',
        width: 100,
        align: 'center',
        render: (text: string, record: IInoutObj) => {
          return {
            props: {
              style: {
                color: record.nonPayment === 0 ? 'black' : 'red'
              }
            },
            children: <div>{record.nonPayment}</div>
          };
        }
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
        width: 110,
        align: 'center',
        fixed: 'right',
        render: (item: IInoutObj) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item, 'EDIT');
              }}
            >
              상세
            </a>
            <Divider type="vertical" />
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item, 'DELETE');
              }}
            >
              강제출차
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
          scroll={{ x: 'max-content', y: 800 }}
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
          onSelectRow={(row: IInoutObj[]) => {
            this.setState({ deleteList: row });
          }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>Total: {total}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    일반차량: {list.filter((l) => l.parkcartype === ETicketType.NORMAL).length}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    유료정기권:{' '}
                    {list.filter((l) => l.parkcartype === ETicketType.SEASONTICKET).length}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    방문권: {list.filter((l) => l.parkcartype === ETicketType.VISITTICKET).length}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    무료정기권:{' '}
                    {list.filter((l) => l.parkcartype === ETicketType.FREETICKET).length}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    미인식: {list.filter((l) => l.parkcartype === ETicketType.UNRECOGNIZED).length}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6} />
                <Table.Summary.Cell index={7} />
                <Table.Summary.Cell index={8} />
                <Table.Summary.Cell index={9}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    {convertNumberWithCommas(this.sum(list, 'parkfee'))}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={10}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    {convertNumberWithCommas(
                      this.sum(list, 'discountfee') + this.sum(list, 'dayDiscountfee')
                    )}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={11}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    {convertNumberWithCommas(this.sum(list, 'payfee'))}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={12}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    {convertNumberWithCommas(this.sum(list, 'paymentAmount'))}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={13}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    {convertNumberWithCommas(this.sum(list, 'nonPayment'))}
                  </span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
          onChange={this.paginationChange}
          // isSelected
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
            footer={[]}
          >
            <InoutCreateModalForm
              onSubmit={(value) => this.create(value)}
              gates={this.state.inGates}
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
              inGates={this.state.inGates}
              outGates={this.state.outGates}
              discountClasses={this.state.discountClasses}
              onCalc={(value) => this.calc(value)}
              onTransfer={(value) => this.transfer(value)}
            />
          </DraggableModal>
        ) : null}
      </PageWrapper>
    );
  }
}

export default Inout;
