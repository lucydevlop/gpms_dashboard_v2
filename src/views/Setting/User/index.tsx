import React, { PureComponent } from 'react';
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
// import CreateProjectModal from '@views/Setting/ProjectSetting/Modal/CreateProjectModal';
// import DraggableModal from '@components/DraggableModal';
// import { IProjectObj } from '@models/project';
// import { projectStore } from '@store/projectStore';
// import CreateUserModal from '@views/Setting/User/Modal/CreateUserModal';
// import { IAgencyObj } from '@models/agency';
// import { conversionDate } from '@utils/conversion';
// import { IEventObj } from '@models/event';
// import DetailModal from '@views/Setting/User/Modal/DetailModal';
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
