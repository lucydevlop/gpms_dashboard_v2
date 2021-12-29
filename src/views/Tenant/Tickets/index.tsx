import React, { PureComponent } from 'react';
import {
  addCorpTicket,
  getAllCorpTicketsSummary,
  getCorpTicketClasses
} from '@api/corpTicketClass';
import { runInAction } from 'mobx';
import {
  ICorpTicketAddObj,
  ICorpTicketClassObj,
  ICorpTicketSummaryObj
} from '@models/corpTicketClass';
import { ColumnProps } from 'antd/lib/table';
import PageWrapper from '@components/PageWrapper';
import StandardTable from '@components/StandardTable';
import {
  DownloadOutlined,
  MonitorOutlined,
  PlusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import { Button, Col, Divider, Row, TablePaginationConfig } from 'antd';
import { localeStore } from '@store/localeStore';
import DraggableModal from '@components/DraggableModal';
import CorpTicketCreateModal from '@views/Tenant/Tickets/modals/CorpTicketCreateModal';
import zdsTips from '@utils/tips';
import { EDelYn } from '@/constants/list';
import CorpTicketAllCreateModal from '@views/Tenant/Tickets/modals/CorpTicketAllCreateModal';

interface IState {
  loading: boolean;
  corpTicketClasses: ICorpTicketClassObj[];
  summaries: ICorpTicketSummaryObj[];
  detailModal: boolean;
  createModal: boolean;
  selected?: ICorpTicketSummaryObj;
  current: number;
  pageSize: number;
  total: number;
  createAllModal: boolean;
}

class TenantTicket extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      corpTicketClasses: [],
      summaries: [],
      detailModal: false,
      createModal: false,
      total: 0,
      current: 1,
      pageSize: 20,
      createAllModal: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    getCorpTicketClasses()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ corpTicketClasses: data });
          });
        }
      })
      .catch(() => {});

    this.pollAllCorpTicketSummary();

    this.setState({ loading: false });
  }

  pollAllCorpTicketSummary() {
    getAllCorpTicketsSummary()
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState({ summaries: data });
          });
        }
      })
      .catch(() => {});
  }

  handleBtnClick = (item: ICorpTicketSummaryObj, key: string) => {
    if (key === 'plus') {
      this.setState({ detailModal: false, createModal: true, selected: item });
    } else {
      this.setState({ detailModal: true, createModal: false, selected: item });
    }
  };

  handleAddCorpTickets = (info: ICorpTicketAddObj) => {
    console.log('handleAddCorpTickets', info);
    addCorpTicket(info)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState(
              {
                createModal: false
              },
              () => {
                zdsTips.success('입주사 할인 등록 완료'), this.pollAllCorpTicketSummary();
              }
            );
          });
        }
      })
      .catch(() => {});
  };

  paginationChange = (pagination: TablePaginationConfig) => {
    this.setState({ current: pagination.current || 1 });
  };

  render() {
    const { localeObj } = localeStore;
    const subjects = this.state.summaries[0] ? this.state.summaries[0].tickets : [];
    const columns: ColumnProps<ICorpTicketSummaryObj>[] = [
      {
        title: '입주사 정보',
        // @ts-ignore
        children: [
          {
            title: '입주사ID',
            key: 'corpId',
            width: 100,
            align: 'center',
            render: (text: string, record: ICorpTicketSummaryObj) => record.corp.corpId
          },
          {
            title: '입주사명',
            key: 'corpName',
            width: 100,
            align: 'center',
            render: (text: string, record: ICorpTicketSummaryObj) => record.corp.corpName
          }
        ]
      },
      {
        title: '할인 정보',
        dataIndex: 'tickets',
        // @ts-ignore
        children: subjects.map((e) => {
          return {
            title: e.title,
            dataIndex: 'tickets[' + e.id + '].total',
            key: 'key-' + e.id,
            align: 'center',
            width: 100,
            render: (text: string, recode: ICorpTicketSummaryObj) => (
              <span>
                {recode.tickets[e.id].total - recode.tickets[e.id].use} /{' '}
                {recode.tickets[e.id].total}
              </span>
            )
          };
        })
      },
      {
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: ICorpTicketSummaryObj) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item, 'plus');
              }}
            >
              <PlusCircleOutlined />
            </a>
            <Divider type="vertical" />
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item, 'detail');
              }}
            >
              <MonitorOutlined />
            </a>
          </div>
        )
      }
    ];
    const { total, current, pageSize } = this.state;

    return (
      <PageWrapper>
        <Row>
          <Col xs={7}>
            <Button
              style={{ marginLeft: '1rem' }}
              type="primary"
              onClick={(e: any) => {
                e.stopPropagation();
                this.setState({ createAllModal: true });
              }}
            >
              + {localeObj['label.create'] || '신규 등록'}
            </Button>
          </Col>
        </Row>
        <StandardTable
          scroll={{ x: 'max-content' }}
          columns={columns}
          loading={this.state.loading}
          // @ts-ignore
          rowKey={(record: ICorpTicketSummaryObj) => String(record.corp.corpId)}
          data={{
            list: this.state.summaries,
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
            visible={this.state.createModal}
            title={localeObj['label.tenant.discount'] || '입주사 할인'}
            onOk={(): void => {
              this.setState({ createModal: false });
            }}
            onCancel={(): void => {
              this.setState({ createModal: false });
            }}
            width={800}
            footer={[]}
          >
            <CorpTicketCreateModal
              corpTicketClasses={this.state.corpTicketClasses.filter((t) => t.delYn === EDelYn.N)}
              corpTicketSummary={this.state.selected}
              onSubmit={this.handleAddCorpTickets}
            />
          </DraggableModal>
        ) : null}
        {this.state.createAllModal ? (
          <DraggableModal
            visible={this.state.createAllModal}
            title={localeObj['label.tenant.discount'] || '입주사 할인'}
            onOk={(): void => {
              this.setState({ createAllModal: false });
            }}
            onCancel={(): void => {
              this.setState({ createAllModal: false });
            }}
            width={1000}
            footer={[]}
          >
            <CorpTicketAllCreateModal />
          </DraggableModal>
        ) : null}
      </PageWrapper>
    );
  }
}

export default TenantTicket;
