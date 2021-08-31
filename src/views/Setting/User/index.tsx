// import { inject, observer } from 'mobx-react';
// import PageWrapper from '@components/PageWrapper';
// import SearchForm from '@components/StandardTable/SearchForm';
// import StandardTable from '@components/StandardTable';
// import { ColumnProps } from 'antd/lib/table';
// import { IUserListReq, IUserObj } from '@models/user';
// import { userStore } from '@store/userStore';
// import { Badge, Button, Tag } from 'antd';
// import { localeStore } from '@store/localeStore';
// import { searchUserFields } from '@views/Setting/User/SearchFields';
// import CreateProjectModal from '@views/Setting/ProjectSetting/modals/CreateProjectModal';
// import DraggableModal from '@components/DraggableModal';
// import { IProjectObj } from '@models/project';
// import { projectStore } from '@store/projectStore';
// import CreateUserModal from '@views/Setting/User/modals/CreateUserModal';
// import { IAgencyObj } from '@models/agency';
// import { conversionDate } from '@utils/conversion';
// import { IEventObj } from '@models/event';
// import DetailModal from '@views/Setting/User/modals/DetailModal';
//
// interface IProps {}
// interface IState {
//   loading: boolean;
//   list: IUserObj[];
//   createShowModal: boolean;
//   searchParam?: IUserListReq;
//   detailModal: boolean;
//   selected?: IUserObj;
// }
//
// @inject('localeStore', 'projectStore', 'userStore')
// @observer
// class User extends PureComponent<IProps, IState> {
//   constructor(props: IProps) {
//     super(props);
//     this.state = {
//       loading: true,
//       list: [],
//       createShowModal: false,
//       detailModal: false
//     };
//   }
//
//   componentDidMount() {
//     this.loadData();
//   }
//
//   async loadData() {
//     this.setState({ loading: true });
//     projectStore.getAll().then();
//     userStore.getAll().then(() => {
//       this.setState({ list: userStore.users });
//     });
//     this.setState({ loading: false });
//   }
//
//   addProdRender = () => {
//     const { localeObj } = localeStore;
//     return (
//       <Button
//         type="primary"
//         onClick={(e: any) => {
//           e.stopPropagation();
//           this.handleCreateClick();
//         }}
//       >
//         + {localeObj['label.create'] || '신규 등록'}
//       </Button>
//     );
//   };
//
//   handleCreateClick = () => {
//     this.setState({ createShowModal: true });
//   };
//
//   handleCreate = (info: IUserObj) => {
//     // console.log('user create', info);
//     this.setState({ loading: true, createShowModal: false });
//     info.activated = true;
//     info.division = !info.division;
//     let projects: IProjectObj[] = [];
//     info.projectIds.map((id) => {
//       projects.push(projectStore.projects.find((p) => p.id === id) as IProjectObj);
//     });
//     info.projects = projects;
//     userStore.create(info).then(() => {
//       this.setState({ list: userStore.users });
//     });
//     this.setState({ loading: false });
//   };
//
//   handleUpdate = (info: IUserObj) => {
//     console.log('user update', info);
//     this.setState({ loading: true, detailModal: false });
//     let projects: IProjectObj[] = [];
//     info.projectIds.map((id) => {
//       projects.push(projectStore.projects.find((p) => p.id === id) as IProjectObj);
//     });
//     info.projects = projects;
//     userStore.update(info).then(() => {
//       this.setState({ list: userStore.users });
//     });
//     this.setState({ loading: false });
//   };
//
//   handleBtnClick = (info: IUserObj) => {
//     //console.log('handleBtnClick', info);
//     this.setState({ detailModal: true, createShowModal: false, selected: info });
//   };
//
//   getSearchData = (info: IUserListReq) => {
//     this.setState({ searchParam: info });
//     this.loadData();
//   };
//
//   tagRender = (projects: IProjectObj[]) => {
//     return (
//       <span>
//         {projects.map((project) => {
//           return (
//             <Tag color={project.color} key={project.id}>
//               {project.name}
//             </Tag>
//           );
//         })}
//       </span>
//     );
//   };
//
//   render() {
//     const { localeObj } = localeStore;
//     const columns: ColumnProps<IUserObj>[] = [
//       {
//         title: 'No',
//         width: 60,
//         dataIndex: 'rank',
//         fixed: 'left',
//         render: (text: string, record: IUserObj, index: number) => index + 1
//       },
//       {
//         title: '사용자ID',
//         width: 100,
//         fixed: 'left',
//         dataIndex: 'login',
//         align: 'center'
//       },
//       {
//         title: '사용자이름',
//         width: 100,
//         fixed: 'left',
//         dataIndex: 'name',
//         align: 'center'
//       },
//       {
//         title: '상태',
//         width: 100,
//         dataIndex: 'activated',
//         align: 'center',
//         render: (text: string, record: IUserObj) => {
//           const status = record.activated ? 'green' : 'gray';
//           return {
//             children: <Badge color={status} />
//           };
//         }
//       },
//       {
//         title: '프로젝트',
//         width: 150,
//         dataIndex: 'projects',
//         align: 'left',
//         render: (text: string, record: IUserObj) => this.tagRender(record.projects)
//       },
//       {
//         title: '배분상태',
//         width: 100,
//         dataIndex: 'division',
//         align: 'center',
//         render: (text: string, record: IUserObj) => {
//           const status = record.division ? 'green' : 'gray';
//           return {
//             children: <Badge color={status} />
//           };
//         }
//       },
//       {
//         title: '등록일',
//         dataIndex: 'lastUpdateTime',
//         width: 150,
//         align: 'center',
//         render: (text: string, record: IUserObj) => conversionDate(record.createdDate) || '--'
//       },
//       {
//         title: 'Action',
//         width: 100,
//         align: 'center',
//         fixed: 'right',
//         render: (item: IUserObj) => (
//           <div>
//             <a
//               onClick={(e: any) => {
//                 e.stopPropagation();
//                 this.handleBtnClick(item);
//               }}
//             >
//               상세
//             </a>
//           </div>
//         )
//       }
//     ];
//     const { list } = this.state;
//     const searchParamField = searchUserFields();
//     return (
//       <PageWrapper>
//         <SearchForm
//           submit={(value) => this.getSearchData(value)}
//           // location={this.props.location}
//           footerRender={() => this.addProdRender()}
//           fieldConfig={searchParamField}
//         />
//         <StandardTable
//           scroll={{ x: 'max-content' }}
//           loading={this.state.loading}
//           // @ts-ignore
//           rowKey={(record: IUserObj) => record.id.toString()}
//           columns={columns}
//           data={{
//             list
//           }}
//         />
//         {this.state.createShowModal ? (
//           <DraggableModal
//             title={localeObj['label.user.create'] || '사용자 등록'}
//             visible={this.state.createShowModal}
//             onOk={() => this.setState({ createShowModal: false })}
//             onCancel={(): void => {
//               this.setState({ createShowModal: false });
//             }}
//           >
//             <CreateUserModal
//               submit={(value) => this.handleCreate(value)}
//               projects={projectStore.projects}
//             />
//           </DraggableModal>
//         ) : null}
//         {this.state.detailModal ? (
//           <DraggableModal
//             title={localeObj['label.user.info'] || '사용자 상세'}
//             visible={this.state.detailModal}
//             onOk={() => this.setState({ detailModal: false })}
//             onCancel={(): void => {
//               this.setState({ detailModal: false });
//             }}
//           >
//             <DetailModal
//               onSubmit={(value) => this.handleUpdate(value)}
//               projects={projectStore.projects}
//               user={this.state.selected!!}
//             />
//           </DraggableModal>
//         ) : null}
//       </PageWrapper>
//     );
//   }
// }
// export default User;

import { delYnOpt, roleOpt, useOrUnuseOpt } from '@/constants/list';
import { IUserObj } from '@/models/user';
import { userStore } from '@/store/userStore';
import { conversionDateTime, conversionEnumValue } from '@/utils/conversion';
import { ColumnProps } from 'antd/lib/table';
import { runInAction, toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { PureComponent } from 'react';
import { searchAdminFields } from '@views/Setting/User/SearchFields';
import PageWrapper from '@components/PageWrapper';
import SearchForm from '@/components/StandardTable/SearchForm';
import { Button, TablePaginationConfig } from 'antd';
import { localeStore } from '@/store/localeStore';
import StandardTable from '@components/StandardTable';
import DraggableModal from '@components/DraggableModal';
import UserCreateModalForm from '@views/Setting/User/Modal/UserCreateModal';
import UserDetailModalForm from '@views/Setting/User/Modal/UserDetailModal';
import { createUser, deleteUser, editUser, getAdminList } from '@api/user';
import { deleteTikcet } from '@api/ticket';
import { ITicketObj } from '@models/ticket';
import { string2mobile } from '@utils/tools';

type IState = {
  loading: boolean;
  list: IUserObj[];
  selected?: IUserObj;
  detailModal: boolean;
  createModal: boolean;
  current: number;
  pageSize: number;
  total: number;
  searchText: string;
  searchLabel: string;
  deleteList: any[];
};
@inject('localeStore', 'userStore')
@observer
class UserSetting extends PureComponent<any, IState> {
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
      searchText: '',
      searchLabel: '',
      deleteList: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  getSearchData = (info: IUserObj) => {
    this.setState({ searchLabel: info.searchLabel });
    this.setState({ searchText: info.searchText });
    this.loadData(info);
  };

  create = (info: IUserObj) => {
    info.userRole = info.role;
    this.setState({ createModal: false });
    createUser(info).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        this.loadData();
      }
    });
  };

  update = (info: IUserObj) => {
    info.userRole = info.role;
    this.setState({ detailModal: false });
    editUser(info).then((res: any) => {
      const { msg, data } = res;
      if (msg === 'success') {
        this.loadData();
      }
    });
  };

  async delete() {
    let count = 0;
    this.state.deleteList.forEach((data: any) => {
      deleteUser(data.idx).then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            count++;
            if (count === this.state.deleteList.length) {
              this.setState({ deleteList: [] });
            }
          });
        }
      });
    });
    await this.loadData();
  }

  handleCreateClick = () => {
    this.setState({ createModal: true });
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
          - {localeObj['label.delete'] || '삭제'}
        </Button>
      </>
    );
  };

  async loadData(info?: IUserObj) {
    this.setState({ loading: true });
    const reqData = {
      searchText: info ? info.searchText : this.state.searchText,
      searchLabel: info ? info.searchLabel : this.state.searchLabel
    };
    const unique: IUserObj[] = [];
    getAdminList(reqData).then((res: any) => {
      const { msg, data } = res;
      data.forEach((user: IUserObj) => {
        if (user.role !== 'SUPER_ADMIN') {
          unique.push(user);
        }
      });
      this.setState({ list: unique });
    });
    this.setState({ loading: false });
  }

  handleBtnClick = (info: IUserObj) => {
    this.setState({ detailModal: true, createModal: false, selected: info });
  };

  render() {
    const { localeObj } = localeStore;
    const columns: ColumnProps<IUserObj>[] = [
      {
        title: '사용여부',
        width: 100,
        key: 'delYn',
        align: 'center',
        filters: delYnOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.delYn.indexOf(value as string) === 0,
        render: (text: string, record: IUserObj) => {
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
        title: '사용자ID',
        width: 100,
        key: 'id',
        align: 'center',
        render: (text: string, record: IUserObj) => record.id
      },
      {
        title: '사용자이름',
        width: 100,
        key: 'userName',
        align: 'center',
        render: (text: string, record: IUserObj) => record.userName
      },
      {
        title: '전화번호',
        width: 100,
        key: 'userName',
        align: 'center',
        render: (text: string, record: IUserObj) =>
          record.userPhone ? string2mobile(record.userPhone) : null
      },
      {
        title: '권한',
        width: 100,
        key: 'role',
        filters: roleOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.role.indexOf(value as string) === 0,
        align: 'center',
        render: (text: string, record: IUserObj) => {
          const type = conversionEnumValue(record.role, roleOpt);
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
        title: '최종로그인시간',
        width: 100,
        key: 'loginDate',
        align: 'center',
        render: (text: string, record: IUserObj) => {
          return record.loginDate
            ? conversionDateTime(record.loginDate, '{y}-{m}-{d} {h}:{i}') || '--'
            : null;
        }
      },
      {
        title: 'ACtion',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: IUserObj) => (
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
    const searchFields = searchAdminFields();
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
          rowKey={(record: IUserObj) => String(record.idx)}
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
          onChange={this.paginationChange}
          isSelected
        />
        {this.state.createModal ? (
          <DraggableModal
            title={localeObj['label.user.create'] || '사용자 등록'}
            visible={this.state.createModal}
            width={800}
            onOk={() => this.setState({ createModal: false })}
            onCancel={(): void => {
              this.setState({ createModal: false });
            }}
          >
            <UserCreateModalForm onSubmit={(value) => this.create(value)} />
          </DraggableModal>
        ) : null}
        {this.state.detailModal ? (
          <DraggableModal
            title={localeObj['label.user.detail'] || '사용자 상세 내역'}
            visible={this.state.detailModal}
            width={800}
            onOk={() => this.setState({ detailModal: false })}
            onCancel={(): void => {
              this.setState({ detailModal: false });
            }}
          >
            <UserDetailModalForm
              user={this.state.selected!!}
              onSubmit={(value) => this.update(value)}
            />
          </DraggableModal>
        ) : null}
      </PageWrapper>
    );
  }
}

export default UserSetting;
