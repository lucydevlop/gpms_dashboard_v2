import React, { PureComponent } from 'react';
import { getVisitorList, visitorDelete } from '@api/visitor';
import { IVisitorObj, IVisitorSearchReq } from '@models/visitor';
import { EDelYn, ETicketSearchDateType, ETicketType } from '@/constants/list';
import moment from 'moment';
import { runInAction, toJS } from 'mobx';
import { userStore } from '@store/userStore';
import { inject, observer } from 'mobx-react';
import { TablePaginationConfig } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { conversionDate } from '@utils/conversion';
import { string2mobile } from '@utils/tools';
import { SearchVisitorFields } from '@views/Visitor/fields/visitor';
import PageWrapper from '@components/PageWrapper';
import SearchForm from '@/components/StandardTable/SearchForm';
import { localeStore } from '@store/localeStore';
import StandardTable from '@/components/StandardTable';
import { DeleteOutlined } from '@ant-design/icons';
import zdsTips from '@utils/tips';

interface IState {
  detailModal: boolean;
  createModal: boolean;
  loading: boolean;
  searchParam?: IVisitorSearchReq;
  list: IVisitorObj[];
  current: number;
  pageSize: number;
  total: number;
  selected?: IVisitorObj;
}
@inject('localeStore', 'userStore')
@observer
class VisitorList extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      createModal: false,
      detailModal: false,
      list: [],
      total: 0,
      current: 1,
      pageSize: 20
    };
  }

  componentDidMount() {
    const createTm = [moment(new Date()).subtract(1, 'month'), moment(new Date())];
    const searchParam: IVisitorSearchReq = {
      dateType: ETicketSearchDateType.VALIDATE,
      ticketType: ETicketType.VISITTICKET,
      fromDate: createTm[0].format('YYYY-MM-DD'),
      toDate: createTm[1].format('YYYY-MM-DD'),
      createTm: [createTm[0].unix(), createTm[1].unix()],
      delYn: EDelYn.N
    };
    this.setState(
      {
        searchParam: searchParam
      },
      () => this.pollData()
    );
  }

  async pollData() {
    const { userInfo } = userStore;
    getVisitorList(this.state.searchParam)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const list = data
              .filter((e: IVisitorObj) => {
                return e.corpSn === userInfo.corpSn;
              })
              .sort((v1: IVisitorObj, v2: IVisitorObj) => {
                return v2.effectDate > v1.effectDate ? 1 : -1;
              });
            this.setState({ list: list });
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  getSearchData = (info: IVisitorSearchReq) => {
    const searchParma: IVisitorSearchReq = {
      dateType: info.dateType,
      searchText: info.searchText,
      fromDate: conversionDate(info.createTm[0]),
      toDate: conversionDate(info.createTm[1]),
      ticketType: ETicketType.VISITTICKET,
      delYn: EDelYn.N,
      createTm: info.createTm,
      searchLabel: 'CARNUM'
    };
    this.setState({ searchParam: searchParma }, () => this.pollData());
  };

  handleBtnClick = (info: IVisitorObj, key: string) => {
    const { localeObj } = localeStore;
    if (key === 'delete') {
      zdsTips.confirm(localeObj['alert.delete'] || '선택 항목을 삭제(비활성) 하시겠습니까?', () => {
        visitorDelete(info.sn)
          .then((res: any) => {
            const { msg, data } = res;
            if (msg === 'success') {
              runInAction(() => {
                this.pollData();
              });
            }
          })
          .catch(() => {});
      });
    }
  };

  paginationChange = (pagination: TablePaginationConfig) => {
    this.setState({ current: pagination.current || 1 });
  };

  render() {
    const columns: ColumnProps<IVisitorObj>[] = [
      {
        title: (
          <div>
            <p>방문일</p>
            <p>차량번호</p>
          </div>
        ),
        key: 'vehicleNo',
        width: 120,
        align: 'center',
        render: (test: string, record: IVisitorObj) => (
          <div>
            <span style={{ color: 'var(--text-color-secondary)' }}>
              <p>
                {moment(record.effectDate).format('YYYY-MM-DD')}
                {/*{conversionDate(moment(record.effectDate).valueOf(), '{y}-{m}-{d}') || '--'}*/}
              </p>
            </span>
            <span style={{ fontSize: '15px' }}>{record.vehicleNo}</span>
          </div>
        )
      },
      // {
      //   title: '방문일',
      //   key: 'effectDate',
      //   width: 100,
      //   align: 'center',
      //   render: (test: string, record: IVisitorObj) =>
      //     conversionDate(record.effectDate as Date, '{y}-{m}-{d}') || '--'
      // },
      {
        title: '메모',
        key: 'etc',
        width: 120,
        align: 'center',
        render: (test: string, record: IVisitorObj) => (
          <div>
            <span style={{ color: 'var(--text-color-secondary)' }}>
              <p>{record.tel ? string2mobile(record.tel) : record.tel}</p>
            </span>
            <span>{record.etc}</span>
          </div>
        )
      },
      // {
      //   title: '전화번호',
      //   key: 'tel',
      //   width: 100,
      //   align: 'center',
      //   render: (test: string, record: IVisitorObj) =>
      //     record.tel ? string2mobile(record.tel) : record.tel
      // },
      {
        title: 'Action',
        width: 80,
        align: 'center',
        render: (item: IVisitorObj) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item, 'delete');
              }}
            >
              <DeleteOutlined />
            </a>
          </div>
        )
      }
    ];

    const { list, total, current, pageSize } = this.state;
    const searchFields = SearchVisitorFields();
    return (
      <PageWrapper>
        <SearchForm
          submit={(value) => this.getSearchData(value)}
          fieldConfig={searchFields}
          footerRender={() => null}
          location={this.props.location}
        />
        <StandardTable
          scroll={{ x: 'max-content' }}
          columns={columns}
          loading={this.state.loading}
          // @ts-ignore
          rowKey={(record: IVisitorObj) => String(record.sn)}
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
      </PageWrapper>
    );
  }
}

export default VisitorList;
