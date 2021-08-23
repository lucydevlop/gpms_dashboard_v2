import { ICorpCreateReq, ICorpObj } from '@models/corp';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { localeStore } from '@store/localeStore';
import { Form } from '@ant-design/compatible';
import { CorpRegisterFields, CorpUpdateFields } from '@views/Tenant/fields/tenant';
import { getFormFields } from '@utils/form';
import { Button, Row } from 'antd';
import { string2mobile } from '@utils/tools';

interface IProps extends FormComponentProps {
  onSubmit: (tenant: ICorpObj) => void;
  tenant?: ICorpObj;
}

interface IState {}

class TenantListModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      console.log('handlerSubmit', fieldsValue);
      fieldsValue.tel ? string2mobile(fieldsValue.tel) : null;
      if (!err) {
        this.props.onSubmit(fieldsValue);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const tenantFieldsConfig = this.props.tenant
      ? CorpUpdateFields(this.props.tenant)
      : CorpRegisterFields();
    const submitFormLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 10,
          offset: 7
        }
      }
    };
    return (
      <Form
        onSubmit={(e: BaseSyntheticEvent) => {
          e.preventDefault();
          this.handlerSubmit();
        }}
      >
        <Row>
          {this.props.tenant
            ? getFormFields(getFieldDecorator, tenantFieldsConfig, true, 7)
            : getFormFields(getFieldDecorator, tenantFieldsConfig, true, 6)}
        </Row>
        <Form.Item
          {...submitFormLayout}
          style={{
            marginTop: 32
          }}
        >
          <Button type="primary" htmlType="submit" style={{ width: '50%', left: '25%' }}>
            저장
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const TenantListModalForm = Form.create<IProps>({ name: 'tenantListModal' })(TenantListModal);
export default TenantListModalForm;
