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
  ticketTypeOpt,
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
import FreeTicketModal from '@views/Ticket/Modal/FreeTicketModal';

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
class FreeTicketTab extends PureComponent<IProps, IState> {
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
      ticketType: ETicketType.FREETICKET,
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
      ticketType: ETicketType.FREETICKET,
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
          zdsTips.error(' ?????? ?????????????????????');
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
          zdsTips.error('????????? ????????? ?????????????????????');
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
          zdsTips.error('????????? ????????? ?????????????????????');
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
            + {localeObj['label.create'] || '?????? ??????'}
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
        title: '????????????',
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
        title: '??????',
        key: 'ticketType',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) => {
          const type = conversionEnumValue(record.ticketType, ticketTypeOpt);
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
        title: '????????????',
        key: 'vehiclNo',
        width: 110,
        align: 'center',
        render: (text: string, record: ITicketObj) => record.vehicleNo
      },
      {
        title: '????????????',
        key: 'effectDate',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) =>
          moment(record.effectDate).format('YYYY-MM-DD HH:mm')
        //conversionDateTime(record.effectDate as Date, '{y}-{m}-{d} {h}:{i}') || '--'
      },
      {
        title: '????????????',
        key: 'expireDate',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) =>
          moment(record.expireDate).format('YYYY-MM-DD HH:mm')
        //conversionDate(record.expireDate as Date, '{y}-{m}-{d} {h}:{i}') || '--'
      },
      {
        title: '??????',
        key: 'name',
        width: 100,
        align: 'center',
        render: (test: string, record: ITicketObj) => record.name
      },
      {
        title: '????????????',
        key: 'tel',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) =>
          record.tel ? string2mobile(record.tel) : null
      },
      {
        title: '????????????',
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
        title: '????????????',
        key: 'carInfo',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) => record.vehiclekind
      },
      {
        title: '????????????',
        key: 'corp',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) =>
          record.corp === undefined || record.corp === null
            ? record.corpName
              ? record.corpName
              : null
            : record.corp.corpName
      },
      {
        title: '??????1',
        key: 'etc',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) => record.etc
      },
      {
        title: '??????2',
        key: 'etc1',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) => record.etc1
      },
      {
        title: '???????????????',
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
              ??????
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
            title={localeObj['label.ticket.create'] || '????????? ??????'}
            visible={this.state.createModal}
            width={800}
            onOk={() => this.setState({ createModal: false })}
            onCancel={(): void => {
              this.setState({ createModal: false });
            }}
            footer={[]}
          >
            <FreeTicketModal
              onSubmit={(value) => this.create(value)}
              ticketClasses={this.state.ticketClassesSelect}
            />
          </DraggableModal>
        ) : null}
        {this.state.detailModal ? (
          <DraggableModal
            title={localeObj['label.ticket.update'] || '????????? ??????'}
            visible={this.state.detailModal}
            width={800}
            onOk={() => this.setState({ detailModal: false })}
            onCancel={(): void => {
              this.setState({ detailModal: false });
            }}
            footer={[]}
          >
            <FreeTicketModal
              onSubmit={(value) => this.update(value)}
              ticket={this.state.selected!!}
              ticketClasses={this.state.ticketClassesSelect}
            />
          </DraggableModal>
        ) : null}
      </>
    );
  }
}

export default FreeTicketTab;
