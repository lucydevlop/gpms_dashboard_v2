import React, { BaseSyntheticEvent, PureComponent } from 'react';
// import { FormComponentProps } from '@ant-design/compatible/lib/form';
// import { IUserObj } from '@models/user';
// import { Form } from '@ant-design/compatible';
// import { getFormFields } from '@utils/form';
// import { Button, Row } from 'antd';
// import { DetailUserFields } from '@views/Setting/UserSetting/SearchFields';
// import { IProjectObj } from '@models/project';
// import { userRoleOpt } from '@/constants/list';
//
// interface IProps extends FormComponentProps {
//   onSubmit: (user: IUserObj) => void;
//   projects: IProjectObj[];
//   user: IUserObj;
// }
//
// interface IState {
//   user: IUserObj;
// }
//
// class DetailModal extends PureComponent<IProps, IState> {
//   componentDidMount() {
//     this.setState({ user: this.props.user });
//   }
//
//   handlerSubmit() {
//     this.props.form.validateFields((err, fieldsValue) => {
//       // console.log('handlerSubmit', fieldsValue);
//       this.props.onSubmit(fieldsValue);
//     });
//   }
//
//   render() {
//     const { getFieldDecorator } = this.props.form;
//     const selectProjects = this.props.projects.map((p) => {
//       return { value: p.id, label: p.name, color: p.color };
//     });
//     const submitFormLayout = {
//       wrapperCol: {
//         xs: {
//           span: 24,
//           offset: 0
//         },
//         sm: {
//           span: 10,
//           offset: 7
//         }
//       }
//     };
//     const detailFieldsConfig = DetailUserFields(selectProjects, userRoleOpt, this.props.user);
//     return (
//       <Form
//         onSubmit={(e: BaseSyntheticEvent) => {
//           e.preventDefault();
//           this.handlerSubmit();
//         }}
//       >
//         <Row>{getFormFields(getFieldDecorator, detailFieldsConfig, false, 7)}</Row>
//         <Form.Item
//           {...submitFormLayout}
//           style={{
//             marginTop: 32
//           }}
//         >
//           <Button type="primary" htmlType="submit">
//             저장
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   }
// }
//
// const DetailModalForm = Form.create<IProps>({ name: 'detailUserModal' })(DetailModal);
// export default DetailModalForm;
