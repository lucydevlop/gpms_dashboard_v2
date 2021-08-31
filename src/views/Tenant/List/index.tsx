import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PageWrapper from '@components/PageWrapper';
import { ICorpObj, ICorpSearchReq } from '@models/corp';
import { corpStore } from '@store/corpStore';
import { runInAction } from 'mobx';
import { localeStore } from '@store/localeStore';
import { conversionDate, conversionDateTime, conversionEnumValue } from '@utils/conversion';
import { delYnOpt, EDelYn } from '@/constants/list';
import { Button, Col, Divider, Row, TablePaginationConfig } from 'antd';
import { DeleteOutlined, DownloadOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/es/table';
import StandardTable from '@components/StandardTable';
import SearchForm from '@/components/StandardTable/SearchForm';
import { searchCorpFields } from '@views/Tenant/fields/tenant';
import DraggableModal from '@components/DraggableModal';
import TenantListModal from '@views/Tenant/modals/TenantListModal';
import zdsTips from '@utils/tips';
import { corpDelete, corpRegister, createTenantByFile } from '@api/tenant';
import { generateCsv } from '@utils/downloadUtil';
import { string2mobile } from '@utils/tools';
import UploadModal from '@components/UploadModal';
import { readCorpObj } from '@utils/readFromCsv';
import { getCorps, updateCorp } from '@api/corp';
import moment from 'moment';

interface IState {
  detailModal: boolean;
  createModal: boolean;
  selected?: ICorpObj;
  list: ICorpObj[];
  searchParam?: ICorpSearchReq;
  uploadModal: boolean;
  deleteList: any[];
  current: number;
  pageSize: number;
  total: number;
  loading: boolean;
}
@inject('localeStore', 'corpStore')
@observer
class TenantList extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      total: 0,
      current: 1,
      pageSize: 20,
      detailModal: false,
      createModal: false,
      list: [],
      deleteList: [],
      searchParam: {
        searchLabel: undefined,
        searchText: '',
        useStatus: undefined
      },
      uploadModal: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getTenantCorpList();
  }

  getTenantCorpList = () => {
    const data = {
      corpName: this.state.searchParam
        ? this.state.searchParam.searchLabel === 'NAME'
          ? this.state.searchParam.searchText
          : ''
        : '',
      corpId: this.state.searchParam
        ? this.state.searchParam.searchLabel === 'ID'
          ? this.state.searchParam.searchText
          : ''
        : '',
      tel: this.state.searchParam
        ? this.state.searchParam.searchLabel === 'MOBILE'
          ? this.state.searchParam.searchText
          : ''
        : '',
      delYn: this.state.searchParam
        ? this.state.searchParam.useStatus === EDelYn.ALL
          ? ''
          : this.state.searchParam.useStatus
        : ''
    };

    getCorps(data)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const storeList = data
              .filter((e: ICorpObj) => {
                return e.corpName !== 'RCS';
              })
              .sort((v1: ICorpObj, v2: ICorpObj) => {
                return v2.updateDate!! > v1.updateDate!! ? 1 : -1;
              });
            this.setState({ list: storeList });
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  getSearchData = (info: ICorpSearchReq) => {
    const searchParam: ICorpSearchReq = {
      searchText: info.searchText ? info.searchText : '',
      searchLabel: info.searchLabel,
      useStatus:
        // @ts-ignore
        info.useStatus === undefined || info.useStatus === 'ALL' ? undefined : info.useStatus
    };
    this.setState({ searchParam: searchParam }, () => this.getTenantCorpList());
  };

  handleBtnClick = (item: ICorpObj, key: string) => {
    const { localeObj } = localeStore;
    if (key === 'delete') {
      zdsTips.confirm(localeObj['alert.delete'] || '선택 항목을 삭제(비활성) 하시겠습니까?', () => {
        item.delYn = EDelYn.Y;
        this.handleUpdateTenant(item);
      });
    } else {
      this.setState({ detailModal: true, createModal: false, selected: item });
    }
  };

  paginationChange = (pagination: TablePaginationConfig) => {
    this.setState({ current: pagination.current || 1 });
  };

  async handleDownloadClick() {
    const headers = [
      '사용여부(미입력 가능)',
      '입주사ID(미입력 가능)',
      '패스워드',
      '입주사명',
      '대표자명',
      '동(미입력 가능)',
      '호수(미입력 가능)',
      '전화번호(미입력 가능)',
      '입주사seq(수정금지)'
    ].join(',');

    const downLoadData = this.state.list.map((tenant: ICorpObj) => {
      const data: any = {};
      data.delYn = conversionEnumValue(tenant.delYn, delYnOpt).label;
      data.corpId = tenant.corpId;
      data.password = '';
      data.corpName = tenant.corpName;
      data.ceoName = tenant.ceoName;
      data.dong = tenant.dong;
      data.ho = tenant.ho;
      data.tel = tenant.tel ? string2mobile(tenant.tel) : null;
      data.sn = tenant.sn;
      return data;
    });
    await generateCsv(downLoadData, headers, '입주사리스트');
  }

  handleUploadData = (file: any): boolean => {
    if (file !== undefined) {
      const fileReader = new FileReader();
      fileReader.readAsText(file, 'euc-kr');
      fileReader.onload = () => {
        const rawData = (fileReader.result as string).replace(/[="]/g, '');
        console.log(rawData);
        const parsedPassengerData: ICorpObj[] = readCorpObj(rawData);
        createTenantByFile(parsedPassengerData)
          .then((res: any) => {
            const { msg, data } = res;
            if (msg === 'success') {
              runInAction(() => {
                this.getTenantCorpList();
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

  handleUploadClick = () => {
    this.setState({ uploadModal: true });
  };

  handleCreateClick = () => {
    this.setState({ createModal: true, detailModal: false });
  };

  handleRegisterTenant = (value: ICorpObj) => {
    value.password = 'store123!@#';
    corpRegister(value).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        runInAction(() => {
          //const corpList = [...this.state.corpList, data];
          //this.setState({ corpList: corpList });
          this.getTenantCorpList();
        });
      }
    });
  };

  handleUpdateTenant = (value: ICorpObj) => {
    value.updateDate = new Date();
    updateCorp(value)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const changeData = data;
            const corpList = this.state.list.map((e) => {
              if (e.sn === changeData.sn) {
                changeData.updateDate = value.updateDate;
                return { ...changeData };
              } else {
                return { ...e };
              }
            });
            this.setState({ list: corpList });
          });
        }
      })
      .catch(() => {});
  };

  async delete() {
    let count = 0;
    this.state.deleteList.forEach((data: any) => {
      data.delYn = EDelYn.Y;
      updateCorp(data).then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            count++;
            if (count === this.state.deleteList.length) {
              this.setState({ deleteList: [] });
              this.getTenantCorpList();
            }
          });
        }
      });
    });
    await this.getTenantCorpList();
  }

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
            <UploadOutlined /> {localeObj['label.upload' || '업로드']}
          </Button>
        </Col>
      </Row>
    );
  };

  render() {
    const { localeObj } = localeStore;
    const columns: ColumnProps<ICorpObj>[] = [
      {
        title: '사용여부',
        key: 'delYn',
        width: 100,
        align: 'center',
        filters: delYnOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value: string | number | boolean, record: ICorpObj) =>
          record.delYn.indexOf(value as string) === 0,
        render: (text: string, record: ICorpObj) => {
          const value = conversionEnumValue(record.delYn, delYnOpt);
          return <span style={{ color: value.color }}>{value.label}</span>;
        }
      },
      {
        title: '입주사ID',
        key: 'corpId',
        width: 100,
        align: 'center',
        render: (text: string, record: ICorpObj) => record.corpId
      },
      {
        title: '입주사명',
        key: 'corpName',
        width: 100,
        align: 'center',
        render: (text: string, record: ICorpObj) => record.corpName
      },
      {
        title: '대표자명',
        key: 'ceoName',
        width: 100,
        align: 'center',
        render: (text: string, record: ICorpObj) => record.ceoName
      },
      {
        title: '동',
        key: 'dong',
        width: 100,
        align: 'center',
        render: (text: string, record: ICorpObj) => record.dong
      },
      {
        title: '호수',
        key: 'ho',
        width: 100,
        align: 'center',
        render: (text: string, record: ICorpObj) => record.ho
      },
      {
        title: '전화번호',
        key: 'tel',
        width: 100,
        align: 'center',
        render: (text: string, record: ICorpObj) => (record.tel ? string2mobile(record.tel) : null)
      },
      {
        title: '수정일자',
        key: 'updateDate',
        width: 100,
        align: 'center',
        render: (text: string, record: ICorpObj) =>
          conversionDateTime(record.updateDate!!, '{y}-{m}-{d} {h}:{i}') || '--'
      },
      {
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: ICorpObj) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item, 'edit');
              }}
            >
              <EditOutlined />
            </a>
            <Divider type="vertical" />
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
    const searchFields = searchCorpFields();
    // @ts-ignore
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
          rowKey={(record: ICorpObj) => String(record.sn)}
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
          onSelectRow={(row: ICorpObj[]) => {
            this.setState({ deleteList: row });
          }}
          onChange={this.paginationChange}
          isSelected
        />
        {this.state.createModal ? (
          <DraggableModal
            title={localeObj['label.tenant.info'] || '입주사 상세'}
            visible={this.state.createModal}
            onOk={(): void => {
              this.setState({ createModal: false });
            }}
            onCancel={(): void => {
              this.setState({ createModal: false });
            }}
            width={800}
          >
            <TenantListModal
              onSubmit={(value) => {
                this.setState({ createModal: false });
                this.handleRegisterTenant(value);
              }}
            />
          </DraggableModal>
        ) : null}
        {this.state.detailModal ? (
          <DraggableModal
            visible={this.state.detailModal}
            title={localeObj['label.tenant.info'] || '입주사 상세'}
            onOk={(): void => {
              this.setState({ detailModal: false });
            }}
            onCancel={(): void => {
              this.setState({ detailModal: false });
            }}
            width={800}
          >
            <TenantListModal
              onSubmit={(value) => {
                this.setState({ detailModal: false });
                this.handleUpdateTenant(value);
              }}
              tenant={this.state.selected}
            />
          </DraggableModal>
        ) : null}
        {this.state.uploadModal ? (
          <UploadModal
            visiable={this.state.uploadModal}
            onOk={() => this.setState({ uploadModal: false })}
            onCancel={() => this.setState({ uploadModal: false })}
            onChange={(file) => this.handleUploadData(file)}
          />
        ) : null}
      </PageWrapper>
    );
  }
}

export default TenantList;
