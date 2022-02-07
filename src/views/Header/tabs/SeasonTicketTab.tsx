import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { localeStore } from '@store/localeStore';
import Table, { ColumnProps } from 'antd/lib/table';
import { ITicketObj, ITicketSelectReq } from '@models/ticket';
import {
  delYnOpt,
  EDelYn,
  ETicketSearchDateType,
  ETicketType,
  payMethodOpt,
  useYnOpt,
  vehicleTypeOpt
} from '@/constants/list';
import { conversionDate, conversionEnumValue } from '@utils/conversion';
import moment from 'moment';
import { string2mobile } from '@utils/tools';
import { searchTicketFields } from '@views/Ticket/FormFields/FormFields';
import SearchForm from '@components/StandardTable/SearchForm';
import StandardTable from '@components/StandardTable';
import { corpStore } from '@store/corpStore';
import { runInAction } from 'mobx';
import { ISelectOptions } from '@utils/form';
import { ITicketClassObj } from '@models/ticketClass';
import { getTicketClasses } from '@/api/ticketClass';
import { createSeasonTicket, getParkinglotTickets, updateSeasonTicket } from '@api/ticket';
import zdsTips from '@utils/tips';
import { Button, Col, Row, TablePaginationConfig } from 'antd';
import DraggableModal from '@components/DraggableModal';
import SeasonTicketModal from '@views/Ticket/Modal/SeasonTicketModal';

interface IProps {}
interface IState {
  loading: boolean;
  list: ITicketObj[];
  current: number;
  pageSize: number;
  total: number;
  searchParam?: ITicketSelectReq;
  ticketClassesSelect: ISelectOptions[];
  ticketClasses: ITicketClassObj[];
  createModal: boolean;
  detailModal: boolean;
  selected?: ITicketObj;
}

@inject('corpStore', 'localeStore')
@observer
class SeasonTicketTab extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      list: [],
      total: 0,
      current: 1,
      pageSize: 20,
      ticketClassesSelect: [],
      ticketClasses: [],
      createModal: false,
      detailModal: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    corpStore.initCorp().then();

    getTicketClasses()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const unique: ISelectOptions[] = [];
            data.forEach((e: ITicketClassObj) => {
              unique.push({ value: e.sn, label: e.ticketName });
            });
            this.setState({ ticketClassesSelect: unique, ticketClasses: data });
          });
        }
      })
      .catch(() => {});

    const createTm = [moment(new Date()).subtract(1, 'month'), moment(new Date())];
    const searchParam: ITicketSelectReq = {
      startDate: createTm[0].format('YYYY-MM-DD'),
      endDate: createTm[1].format('YYYY-MM-DD'),
      fromDate: createTm[0].format('YYYY-MM-DD'),
      toDate: createTm[1].format('YYYY-MM-DD'),
      createTm: [createTm[0].unix(), createTm[1].unix()],
      searchDateLabel: ETicketSearchDateType.VALIDATE,
      ticketType: ETicketType.SEASONTICKET,
      searchLabel: '',
      searchText: '',
      delYn: EDelYn.N,
      corpName: ''
    };

    this.setState(
      {
        searchParam: searchParam
      },
      () => this.pollData()
    );
  }

  getSearchData = (info: ITicketSelectReq) => {
    const searchParam: ITicketSelectReq = {
      searchDateLabel: info.searchDateLabel,
      startDate: conversionDate(info.createTm[0]),
      endDate: conversionDate(info.createTm[1]),
      fromDate: conversionDate(info.createTm[0]),
      toDate: conversionDate(info.createTm[1]),
      createTm: info.createTm,
      delYn: info.delYn,
      ticketType: ETicketType.SEASONTICKET,
      searchLabel: info.searchLabel,
      searchText: info.searchText === undefined ? '' : info.searchText,
      corpName: info.corpName
    };
    this.setState({ searchParam: searchParam, current: 1 }, () => this.pollData());
  };

  async pollData() {
    getParkinglotTickets(this.state.searchParam)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            data.sort((v1: any, v2: any) =>
              Date.parse(v2.effectDate) > Date.parse(v1.effectDate) ? 1 : -1
            );
            this.setState({ list: data, total: data.length });
          });
        }
      })
      .catch(() => {
        runInAction(() => {
          zdsTips.error(' 변경 실패하였습니다');
        });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  create = (info: ITicketObj) => {
    if (info.corpSn === -1) {
      info.corpSn = 0;
    }
    this.setState({ createModal: false });
    createSeasonTicket(info)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const tickets = [...this.state.list, data];
            this.setState({ list: tickets });
            // this.pollData();
          });
        }
      })
      .catch((res: any) => {
        console.log('create error', res);
        const { msg, data } = res;
        runInAction(() => {
          zdsTips.error('정기권 등록에 실패하였습니다');
        });
      });
  };

  update = (info: ITicketObj) => {
    if (info.corpSn === -1) {
      info.corpSn = 0;
    }
    this.setState({ detailModal: false });
    updateSeasonTicket(info)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            //this.pollData();
            const ticket = data;
            const tickets = this.state.list.map((t) => {
              if (t.sn === ticket.sn) return { ...ticket };
              return { ...t };
            });
            this.setState({ list: tickets }, () => console.log(this.state.list));
          });
        }
      })
      .catch(() => {
        runInAction(() => {
          zdsTips.error('정기권 변경에 실패하였습니다');
        });
      });
  };

  addProdRender = () => {
    const { localeObj } = localeStore;
    return (
      <Row>
        <Col xs={6}>
          <Button
            type="primary"
            onClick={(e: any) => {
              e.stopPropagation();
              this.setState({ createModal: true });
            }}
          >
            + {localeObj['label.create'] || '신규 등록'}
          </Button>
        </Col>
      </Row>
    );
  };

  paginationChange = (pagination: TablePaginationConfig) => {
    this.setState({ current: pagination.current || 1 });
  };

  render() {
    const { localeObj } = localeStore;
    const columns: ColumnProps<ITicketObj>[] = [
      {
        title: '사용여부',
        key: 'delYn',
        width: 110,
        align: 'center',
        fixed: 'left',
        filters: delYnOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.delYn.indexOf(value as string) === 0,
        render: (test: string, record: ITicketObj) => {
          const type = conversionEnumValue(record.delYn, delYnOpt);
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
        title: '차량번호',
        key: 'vehiclNo',
        width: 110,
        align: 'center',
        render: (text: string, record: ITicketObj) => record.vehicleNo
      },
      {
        title: '시작일자',
        key: 'effectDate',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) =>
          moment(record.effectDate).format('YYYY-MM-DD HH:mm')
        //conversionDateTime(record.effectDate as Date, '{y}-{m}-{d} {h}:{i}') || '--'
      },
      {
        title: '종료일자',
        key: 'expireDate',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) =>
          moment(record.expireDate).format('YYYY-MM-DD HH:mm')
        //conversionDate(record.expireDate as Date, '{y}-{m}-{d} {h}:{i}') || '--'
      },
      {
        title: '이름',
        key: 'name',
        width: 100,
        align: 'center',
        render: (test: string, record: ITicketObj) => record.name
      },
      {
        title: '전화번호',
        key: 'tel',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) =>
          record.tel ? string2mobile(record.tel) : null
      },
      {
        title: '정기권정보',
        key: 'ticketName',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) => record.ticketName
      },
      {
        title: '차량타입',
        key: 'vehicleType',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) => {
          const type = conversionEnumValue(record.vehicleType, vehicleTypeOpt);
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
        title: '차량정보',
        key: 'carInfo',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) => record.vehicleKind
      },
      {
        title: '입주사명',
        key: 'corpName',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) => record.corpName
      },
      {
        title: '정보1',
        key: 'etc',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) => record.etc
      },
      {
        title: '정보2',
        key: 'etc1',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) => record.etc1
      },
      {
        title: '결제방법',
        key: 'payMethod',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) =>
          record.payMethod ? conversionEnumValue(record.payMethod, payMethodOpt).label : '-'
      },
      {
        title: '연장',
        key: 'extendYn',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) =>
          record.extendYn ? conversionEnumValue(record.extendYn, useYnOpt).label : '-'
      },
      {
        title: '마지막입차',
        key: 'lastInDate',
        width: 110,
        align: 'center',
        sorter: (a, b) => {
          let atime = new Date(a.lastInDate || '0').getTime();
          let btime = new Date(b.lastInDate || '0').getTime();
          return atime - btime;
        },
        render: (test: string, record: ITicketObj) =>
          record.lastInDate ? moment(record.lastInDate).format('YYYY-MM-DD HH:mm') : null
      },
      {
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: ITicketObj) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.setState({ detailModal: true, createModal: false, selected: item });
              }}
            >
              상세
            </a>
          </div>
        )
      }
    ];

    const { list, total, current, pageSize } = this.state;
    const searchFields = searchTicketFields();

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
          rowKey={(record: ITicketObj) => String(record.sn)}
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
        />
        {this.state.createModal ? (
          <DraggableModal
            title={localeObj['label.ticket.create'] || '정기권 등록'}
            visible={this.state.createModal}
            width={800}
            onOk={() => this.setState({ createModal: false })}
            onCancel={(): void => {
              this.setState({ createModal: false });
            }}
            footer={[]}
          >
            <SeasonTicketModal
              onSubmit={(value) => this.create(value)}
              ticketClassesSelect={this.state.ticketClassesSelect}
              ticketClasses={this.state.ticketClasses}
            />
          </DraggableModal>
        ) : null}
        {this.state.detailModal ? (
          <DraggableModal
            title={localeObj['label.ticket.update'] || '정기권 상세'}
            visible={this.state.detailModal}
            width={800}
            onOk={() => this.setState({ detailModal: false })}
            onCancel={(): void => {
              this.setState({ detailModal: false });
            }}
            footer={[]}
          >
            <SeasonTicketModal
              onSubmit={(value) => this.update(value)}
              ticket={this.state.selected!!}
              ticketClassesSelect={this.state.ticketClassesSelect}
              ticketClasses={this.state.ticketClasses}
            />
          </DraggableModal>
        ) : null}
      </>
    );
  }
}

export default SeasonTicketTab;
