import PageWrapper from '@/components/PageWrapper';
import SearchForm from '@/components/StandardTable/SearchForm';
import {
  delYnOpt,
  ETicketSearchDateType,
  ETicketType,
  ticketTypeOpt,
  useOrUnuseOpt,
  vehicleTypeOpt
} from '@/constants/list';
import {
  createParkinglotTicket,
  createTicketByFile,
  deleteTikcet,
  getCorpList,
  getParkinglotTickets
} from '@/api/ticket';
import { ITicketObj, ITicketSelectReq } from '@/models/ticket';
import { localeStore } from '@/store/localeStore';
import { conversionDate, conversionDateTime, conversionEnumValue } from '@/utils/conversion';
import { Button, TablePaginationConfig } from 'antd';
import Table, { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import React from 'react';
import { PureComponent } from 'react';
import { searchTicketFields } from './FormFields/FormFields';
import { runInAction, toJS } from 'mobx';
import StandardTable from '@/components/StandardTable';
import DraggableModal from '@/components/DraggableModal';
import { ICorpObj } from '@/models/corp';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { generateCsv } from '@utils/downloadUtil';
import TicketModal from './Modal/TicketModal';
import UploadModal from '@components/UploadModal';
import { readTicketObj } from '@utils/readFromCsv';

type IState = {
  loading: boolean;
  list: ITicketObj[];
  current: number;
  pageSize: number;
  total: number;
  createModal: boolean;
  detailModal: boolean;
  searchParam?: ITicketSelectReq;
  selected?: ITicketObj;
  corpList?: ICorpObj[];
  deleteList: any[];
  clear: boolean;
  uploadModa: boolean;
};

class Ticket extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      list: [],
      total: 0,
      current: 1,
      pageSize: 20,
      createModal: false,
      detailModal: false,
      deleteList: [],
      clear: false,
      uploadModa: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const createTm = [moment(new Date()).subtract(3, 'month'), moment(new Date())];
    const searchParam: ITicketSelectReq = {
      startDate: createTm[0].format('YYYY-MM-DD'),
      endDate: createTm[1].format('YYYY-MM-DD'),
      fromDate: createTm[0].format('YYYY-MM-DD'),
      toDate: createTm[1].format('YYYY-MM-DD'),
      createTm: [createTm[0].unix(), createTm[1].unix()],
      dateType: ETicketSearchDateType.VALIDATE,
      ticketType: ETicketType.ALL
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
      dateType: info.dateType,
      startDate: conversionDate(info.createTm[0]),
      endDate: conversionDate(info.createTm[1]),
      fromDate: conversionDate(info.createTm[0]),
      toDate: conversionDate(info.createTm[1]),
      createTm: info.createTm,
      delYn: info.delYn,
      ticketType: info.ticketType,
      searchLabel: info.searchLabel,
      searchText: info.searchText
    };
    this.setState({ searchParam: searchParam, current: 1 }, () => this.pollData());
  };

  create = (info: ITicketObj) => {
    // console.log('create', info);
    if (info.corpSn === -1) {
      info.corpSn = undefined;
    }
    this.setState({ createModal: false });
    createParkinglotTicket(info).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        runInAction(() => {
          //const ticket = data;
          //const tickets = [...this.state.list, ticket];
          //this.setState({ list: tickets });
          this.pollData();
        });
      }
    });
  };

  async pollData() {
    this.state.searchParam!!.ticketType === 'ALL'
      ? (this.state.searchParam!!.ticketType = undefined)
      : null;
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
      .catch(() => {})
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  update = (info: ITicketObj) => {
    if (info.corpSn === -1) {
      info.corpSn = undefined;
    }
    this.setState({ detailModal: false });
    createParkinglotTicket(info).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        runInAction(() => {
          //this.pollData();
          const ticket = data;
          const tickets = this.state.list.map((t) => {
            if (t.sn === ticket.sn) return { ...ticket };
            return { ...t };
          });
          this.setState({ list: tickets });
        });
      }
    });
  };

  async delete() {
    let count = 0;
    this.state.deleteList.forEach((data: any) => {
      deleteTikcet(data.sn).then((res: any) => {
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
          - {localeObj['label.delete'] || '삭제'}
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
        <Button
          style={{ marginLeft: '1rem' }}
          type="primary"
          onClick={(e: any) => {
            e.stopPropagation();
            this.handleUploadClick();
          }}
        >
          <UploadOutlined /> {localeObj['label.upload'] || '업로드'}
        </Button>
      </>
    );
  };

  handleCreateClick = () => {
    this.setState({ createModal: true });
  };

  handleBtnClick = (info: ITicketObj) => {
    this.setState({ detailModal: true, createModal: false, selected: info });
  };

  async handleDownloadClick() {
    const headers = [
      '차량번호',
      '상품타입',
      '이름',
      '전화번호',
      '시작일',
      '종료일',
      '차량정보',
      '차량모델정보(미입력 가능)',
      '입주사명(미입력 가능)',
      '회사정보1(미입력 가능)',
      '회사정보2(미입력 가능)',
      '정기권seq(수정금지)'
    ].join(',');

    const downLoadData = this.state.list.map((ticket) => {
      const data: any = {};
      data.vehicleNo = ticket.vehicleNo;
      data.ticketType = conversionEnumValue(ticket.ticketType, ticketTypeOpt).label;
      data.name = ticket.name;
      data.tel = ticket.tel;
      data.effectDate = conversionDate(ticket.effectDate as Date, '{y}-{m}-{d}');
      data.expireDate = conversionDate(ticket.expireDate as Date, '{y}-{m}-{d}');
      data.vehicleType = conversionEnumValue(ticket.vehicleType, vehicleTypeOpt).label;
      data.vehiclekind = ticket.vehiclekind;
      data.corpName = this.state.corpList
        ? this.state.corpList.filter((c) => c.sn === ticket.corpSn)[0].corpName
        : '';
      data.etc = ticket.etc;
      data.etc1 = ticket.etc1;
      return data;
    });
    await generateCsv(downLoadData, headers, '정기권');
  }

  handleUploadClick = () => {
    this.setState({ uploadModa: true });
  };

  handleUploadData = (file: any): boolean => {
    if (file !== undefined) {
      const fileReader = new FileReader();
      fileReader.readAsText(file, 'euc-kr');
      fileReader.onload = () => {
        const rawData = (fileReader.result as string).replace(/[="]/g, '');
        const parsedPassengerData: ITicketObj[] = readTicketObj(rawData);
        // console.log(' csv data ' + JSON.stringify(parsedPassengerData));
        createTicketByFile(parsedPassengerData)
          .then((res: any) => {
            const { msg, data } = res;
            if (msg === 'success') {
              runInAction(() => {
                this.pollData();
              });
            }
          })
          .catch(() => {
            return false;
          });
      };
      return true;
    } else {
      return false;
    }
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
          conversionDateTime(record.effectDate as Date, '{y}-{m}-{d} {h}:{i}') || '--'
      },
      {
        title: '종료일자',
        key: 'expireDate',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) =>
          conversionDate(record.expireDate as Date, '{y}-{m}-{d} {h}:{i}') || '--'
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
        render: (test: string, record: ITicketObj) => record.tel
      },
      {
        title: '타입',
        key: 'ticketType',
        width: 110,
        align: 'center',
        filters: ticketTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.ticketType.indexOf(value as string) === 0,
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
        render: (test: string, record: ITicketObj) => record.vehiclekind
      },
      {
        title: '입주사명',
        key: 'corp',
        width: 110,
        align: 'center',
        render: (test: string, record: ITicketObj) =>
          record.corp === undefined || record.corp === null ? null : record.corp.corpName
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
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: ITicketObj) => (
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
    const searchFields = searchTicketFields();
    return (
      <PageWrapper>
        <SearchForm
          submit={(value) => this.getSearchData(value)}
          location={this.props.loaction}
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
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    정기권:
                    {list.filter((tmp) => tmp.ticketType === ETicketType.SEASONTICKET).length}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    방문권:
                    {list.filter((tmp) => tmp.ticketType === ETicketType.VISITTICKET).length}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    무료권:
                    {list.filter((tmp) => tmp.ticketType === ETicketType.FREETICKET).length}
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
            title={localeObj['label.ticket.create'] || '정기권 등록'}
            visible={this.state.createModal}
            width={800}
            onOk={() => this.setState({ createModal: false })}
            onCancel={(): void => {
              this.setState({ createModal: false });
            }}
          >
            <TicketModal onSubmit={(value) => this.create(value)} />
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
          >
            <TicketModal onSubmit={(value) => this.update(value)} ticket={this.state.selected!!} />
          </DraggableModal>
        ) : null}
        {this.state.uploadModa ? (
          <UploadModal
            visiable={this.state.uploadModa}
            onOk={() => this.setState({ uploadModa: false })}
            onCancel={(): void => {
              this.setState({ uploadModa: false });
            }}
            onChange={(file) => this.handleUploadData(file)}
          />
        ) : null}
      </PageWrapper>
    );
  }
}

export default Ticket;
