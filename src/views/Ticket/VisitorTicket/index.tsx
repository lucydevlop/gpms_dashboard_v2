import PageWrapper from '@components/PageWrapper';
import SearchForm from '@components/StandardTable/SearchForm';
import {
  delYnOpt,
  EDelYn,
  ETicketSearchDateType,
  ETicketType,
  ticketTypeOpt,
  vehicleTypeOpt
} from '@/constants/list';
import {
  createSeasonTicket,
  createVisitTickets,
  deleteSeasonTicket,
  getParkinglotTickets,
  updateSeasonTicket
} from '@api/ticket';
import { ITicketObj, ITicketSelectReq } from '@models/ticket';
import { localeStore } from '@store/localeStore';
import { conversionDate, conversionDateTime, conversionEnumValue } from '@utils/conversion';
import { Button, Col, Row, TablePaginationConfig } from 'antd';
import Table, { ColumnProps } from 'antd/lib/table';
import moment from 'moment';
import React, { PureComponent } from 'react';
import { searchTicketFields } from '../FormFields/FormFields';
import { runInAction } from 'mobx';
import StandardTable from '@components/StandardTable';
import DraggableModal from '@components/DraggableModal';
import { ICorpObj } from '@models/corp';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { generateCsv } from '@utils/downloadUtil';
import TicketModal from '../Modal/TicketModal';
import UploadModal from '@components/UploadModal';
import { readTicketObj } from '@utils/readFromCsv';
import { getTicketClasses } from '@api/ticketClass';
import { ISelectOptions } from '@utils/form';
import { ITicketClassObj } from '@models/ticketClass';
import { string2mobile } from '@utils/tools';
import { inject, observer } from 'mobx-react';
import { corpStore } from '@store/corpStore';
import zdsTips from '@utils/tips';

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
  ticketClassesSelect: ISelectOptions[];
};

@inject('corpStore', 'localeStore')
@observer
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
      uploadModa: false,
      ticketClassesSelect: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    corpStore.initCorp();
    const createTm = [moment(new Date()).subtract(3, 'month'), moment(new Date())];
    const searchParam: ITicketSelectReq = {
      startDate: createTm[0].format('YYYY-MM-DD'),
      endDate: createTm[1].format('YYYY-MM-DD'),
      fromDate: createTm[0].format('YYYY-MM-DD'),
      toDate: createTm[1].format('YYYY-MM-DD'),
      createTm: [createTm[0].unix(), createTm[1].unix()],
      searchDateLabel: ETicketSearchDateType.VALIDATE,
      ticketType: ETicketType.VISITTICKET,
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
      ticketType: ETicketType.VISITTICKET,
      searchLabel: info.searchLabel,
      searchText: info.searchText === undefined ? '' : info.searchText,
      corpName: info.corpName
    };
    this.setState({ searchParam: searchParam, current: 1 }, () => this.pollData());
  };

  async pollData() {
    // this.state.searchParam!!.ticketType === 'ALL'
    //   ? (this.state.searchParam!!.ticketType = undefined)
    //   : null;
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

  create = (info: ITicketObj) => {
    // console.log('create', info);
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
          });
        }
      })
      .catch((res: any) => {
        //console.log('create error', res);
        const { msg, data } = res;
        runInAction(() => {
          zdsTips.error('방문권 등록에 실패하였습니다');
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
          zdsTips.error('방문권 변경에 실패하였습니다');
        });
      });
  };

  async delete() {
    let count = 0;
    this.state.deleteList.forEach((data: ITicketObj) => {
      data.delYn = EDelYn.Y;
      deleteSeasonTicket(data).then((res: any) => {
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
      <Row>
        <Col xs={6}>
          <Button
            type="primary"
            onClick={(e: any) => {
              e.stopPropagation();
              this.handleCreateClick();
            }}
          >
            + {localeObj['label.create'] || '신규 등록'}
          </Button>
        </Col>
        <Col xs={5}>
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
        </Col>
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
        <Col xs={1}>
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
        </Col>
      </Row>
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
      '상품타입(방문권)',
      '이름',
      '전화번호',
      '시작일',
      '종료일',
      '차량정보',
      '차량모델정보(미입력 가능)',
      '입주사명(미입력 가능)',
      '회사정보1(미입력 가능)',
      '회사정보2(미입력 가능)',
      '마지막입차일',
      '정기권seq(수정금지)'
    ].join(',');

    const downLoadData: any[] = [];
    const initialData: any = {};
    initialData.vehicleNo = '11가1111(업로드 시 삭제)';
    initialData.ticketType = '방문권';
    initialData.name = '김아무개';
    initialData.tel = '010-0000-0000';
    initialData.effectDate = '2021-01-01';
    initialData.expireDate = '2021-01-01';
    initialData.vehicleType = '소형/중형/대형(정확히기입)';
    initialData.vehiclekind = '현대 xxx';
    initialData.corpName = '입주사명(정확히기입)';
    initialData.etc = 'xxxxx';
    initialData.etc1 = 'xxxxx';
    initialData.lastInDate = '2021-01-01 00:00(미입력)';
    initialData.sn = '신규 시 미입력,수정 시 다운로드 된 데이터 변경 불가 준수';

    downLoadData.push(initialData);

    this.state.list.map((ticket) => {
      const data: any = {};
      data.vehicleNo = ticket.vehicleNo;
      data.ticketType = conversionEnumValue(ticket.ticketType, ticketTypeOpt).label;
      data.name = ticket.name;
      data.tel = ticket.tel;
      data.effectDate = conversionDate(ticket.effectDate as Date, '{y}-{m}-{d}');
      data.expireDate = conversionDate(ticket.expireDate as Date, '{y}-{m}-{d}');
      data.vehicleType = conversionEnumValue(ticket.vehicleType, vehicleTypeOpt).label;
      data.vehiclekind = ticket.vehicleKind;
      data.corpName = ticket.corpName;
      data.etc = ticket.etc;
      data.etc1 = ticket.etc1;
      data.lastInDate =
        conversionDateTime(ticket.lastInDate as Date, '{y}-{m}-{d} {h}:{i}') || '--';
      data.sn = ticket.sn;
      downLoadData.push(data);
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
        createVisitTickets(parsedPassengerData)
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
        title: '타입',
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
          location={this.props.location}
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
                {/*<Table.Summary.Cell index={2}>*/}
                {/*  <span style={{ fontSize: '14px', fontWeight: 600 }}>*/}
                {/*    유료정기권:*/}
                {/*    {list.filter((tmp) => tmp.ticketType === ETicketType.SEASONTICKET).length}*/}
                {/*  </span>*/}
                {/*</Table.Summary.Cell>*/}
                {/*<Table.Summary.Cell index={2}>*/}
                {/*  <span style={{ fontSize: '14px', fontWeight: 600 }}>*/}
                {/*    방문권:*/}
                {/*    {list.filter((tmp) => tmp.ticketType === ETicketType.VISITTICKET).length}*/}
                {/*  </span>*/}
                {/*</Table.Summary.Cell>*/}
                {/*<Table.Summary.Cell index={2}>*/}
                {/*  <span style={{ fontSize: '14px', fontWeight: 600 }}>*/}
                {/*    무료정기권:*/}
                {/*    {list.filter((tmp) => tmp.ticketType === ETicketType.FREETICKET).length}*/}
                {/*  </span>*/}
                {/*</Table.Summary.Cell>*/}
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
            footer={[]}
          >
            <TicketModal
              onSubmit={(value) => this.create(value)}
              ticketClasses={this.state.ticketClassesSelect}
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
            <TicketModal
              onSubmit={(value) => this.update(value)}
              ticket={this.state.selected!!}
              ticketClasses={this.state.ticketClassesSelect}
            />
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
