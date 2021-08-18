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

interface UserDetailModalProps extends FormComponentProps {
  user: IUserObj;
  onSubmit: (user: IUserObj) => void;
}
@inject('localeStore')
@observer
class UserDetailModal extends PureComponent<UserDetailModalProps> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      //fieldsValue.inDate = conversionDateTime(fieldsValue.inDate);
      if (!err) this.props.onSubmit(fieldsValue);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const createInoutFields = newUserFields(this.props.user);
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

const UserDetailModalForm = Form.create<UserDetailModalProps>({ name: 'userCreateModal' })(
  UserDetailModal
);
export default UserDetailModalForm;
