import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PageWrapper from '@components/PageWrapper';
import { ICorpObj, ICorpSearchReq, IFileCorpObj } from '@models/corp';
import { corpStore } from '@store/corpStore';
import { runInAction } from 'mobx';
import { localeStore } from '@store/localeStore';
import { conversionDate, conversionDateTime, conversionEnumValue } from '@utils/conversion';
import { delYnOpt, ECorpSearchCondition, EDelYn, useOrUnuseOpt } from '@/constants/list';
import { Button, Divider } from 'antd';
import { DeleteOutlined, DownloadOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { ColumnProps } from 'antd/es/table';
import StandardTable from '@components/StandardTable';
import { getCorpList } from '@api/ticket';
import SearchForm from '@/components/StandardTable/SearchForm';
import { searchCorpFields } from '@views/Tenant/fields/tenant';
import DraggableModal from '@components/DraggableModal';
import TenantListModal from '@views/Tenant/modals/TenantListModal';
import zdsTips from '@utils/tips';
import { corpRegister, corpUpdate, corpDelete, createTenantByFile } from '@api/tenant';
import { generateCsv } from '@utils/downloadUtil';
import { string2mobile } from '@utils/tools';
import UploadModal from '@components/UploadModal';
import { readCorpObj } from '@utils/readFromCsv';

interface IState {
  detailModal: boolean;
  createModal: boolean;
  selected?: ICorpObj;
  corpList: any[];
  searchParam?: ICorpSearchReq;
  uploadModal: boolean;
}
@inject('localeStore', 'corpStore')
@observer
class TenantList extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      detailModal: false,
      createModal: false,
      corpList: [],
      searchParam: {
        searchLabel: undefined,
        searchText: '',
        useStatus: undefined
      },
      uploadModal: false
    };
  }

  componentDidMount() {
    this.getTenantCorpList();
  }

  getTenantCorpList = () => {
    getCorpList(this.state.searchParam).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        runInAction(() => {
          this.setState({ corpList: data });
        });
      }
    });
  };

  getSearchData = (info: ICorpSearchReq) => {
    const searchParam: ICorpSearchReq = {
      searchText: info.searchText ? info.searchText : '',
      searchLabel: info.searchLabel,
      useStatus: info.useStatus
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

  async handleDownloadClick() {
    const headers = [
      '사용여부',
      '입주사ID',
      '입주사명',
      '대표자명',
      '동',
      '호수',
      '전화번호',
      '수정일자'
    ].join(',');

    const downLoadData = this.state.corpList.map((tenant: ICorpObj) => {
      const data: any = {};
      data.delYn = conversionEnumValue(tenant.delYn, delYnOpt).label;
      data.corpId = tenant.corpId;
      data.corpName = tenant.corpName;
      data.ceoName = tenant.ceoName;
      data.dong = tenant.dong;
      data.ho = tenant.ho;
      data.tel = tenant.tel ? string2mobile(tenant.tel) : null;
      data.updateDate = conversionDate(tenant.updateDate as Date, '{y}-{m}-{d}');
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
        const parsedPassengerData: IFileCorpObj[] = readCorpObj(rawData);
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
    corpUpdate(value)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            const changeData = data;
            const corpList = this.state.corpList.map((e) => {
              if (e.sn === changeData.sn) {
                return { ...changeData };
              } else {
                return { ...e };
              }
            });
            this.setState({ corpList: corpList });
          });
        }
      })
      .catch(() => {});
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
      </>
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
          conversionDateTime(record.updateDate, '{y}-{m}-{d} {h}:{i}') || '--'
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
    const searchFields = searchCorpFields();
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
          // @ts-ignore
          rowKey={(record: ICorpObj) => String(record.sn)}
          data={{ list: this.state.corpList }}
          hidePagination
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
