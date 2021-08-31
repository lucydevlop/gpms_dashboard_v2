import { IInoutObj } from '@/models/inout';
import { conversionDateTime } from '@/utils/conversion';
import { getFormFields } from '@/utils/form';
import { Form } from '@ant-design/compatible';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Button, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { BaseSyntheticEvent, PureComponent, Component } from 'react';
import { IUserObj } from '@models/user';
import { newUserFields } from '@views/Setting/User/SearchFields';

interface UserCreateModalProps extends FormComponentProps {
  onSubmit: (user: IUserObj) => void;
}
@inject('localeStore')
@observer
class UserCreateModal extends PureComponent<UserCreateModalProps> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      //fieldsValue.inDate = conversionDateTime(fieldsValue.inDate);
      if (fieldsValue.password !== fieldsValue.passwordCnfirm) {
        return Promise.reject(new Error('비밀번호가 일치하지 않습니다'));
      }
      if (!err) this.props.onSubmit(fieldsValue);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const createInoutFields = newUserFields();
    return (
      <>
        <Row style={{ marginTop: '10px' }}>
          <Form
            onSubmit={(e: BaseSyntheticEvent) => {
              e.preventDefault();
              this.handlerSubmit();
            }}
          >
            <Row>{getFormFields(getFieldDecorator, createInoutFields, true, 6)}</Row>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: '10px', width: '50%', left: '25%' }}
            >
              등록
            </Button>
          </Form>
        </Row>
      </>
    );
  }
}

const UserCreateModalForm = Form.create<UserCreateModalProps>({ name: 'userCreateModal' })(
  UserCreateModal
);
export default UserCreateModalForm;
