import React, { BaseSyntheticEvent, PureComponent } from 'react';
// import { FormComponentProps } from '@ant-design/compatible/lib/form';
// import { Form } from '@ant-design/compatible';
// import CreateProjectModalForm from '@views/Setting/ProjectSetting/Modal/CreateProjectModal';
// import { Button, Row } from 'antd';
// import { IProjectObj } from '@models/project';
// import { getFormFields } from '@utils/form';
// import { CreateUserFields } from '@views/Setting/UserSetting/SearchFields';
// import { userRoleOpt } from '@/constants/list';
//
// interface IProps extends FormComponentProps {
//   submit: (param: any) => void;
//   projects: IProjectObj[];
// }
// interface IState {}
//
// class CreateUserModal extends PureComponent<IProps, IState> {
//   constructor(props: IProps) {
//     super(props);
//     this.state = {};
//   }
//
//   handlerSubmit() {
//     this.props.form.validateFields((err, fieldsValue) => {
//       this.props.submit(fieldsValue);
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
//     const newFieldsConfig = CreateUserFields(selectProjects, userRoleOpt);
//     return (
//       <Form
//         onSubmit={(e: BaseSyntheticEvent) => {
//           e.preventDefault();
//           this.handlerSubmit();
//         }}
//       >
//         <Row>{getFormFields(getFieldDecorator, newFieldsConfig, false, 7)}</Row>
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
// const CreateUserModalForm = Form.create<IProps>({ name: 'createUserModal' })(CreateUserModal);
//
// export default CreateUserModalForm;
