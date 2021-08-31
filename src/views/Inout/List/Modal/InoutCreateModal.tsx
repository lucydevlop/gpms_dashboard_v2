import { IInoutObj } from '@models/inout';
import { conversionDateTime } from '@utils/conversion';
import { getFormFields } from '@utils/form';
import { Form } from '@ant-design/compatible';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Button, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { BaseSyntheticEvent, PureComponent, Component } from 'react';
import { newInoutFields } from '../FormFields/FormFields';

interface InoutCreateModalProps extends FormComponentProps {
  onSubmit: (inout: IInoutObj) => void;
  gates: any[];
}
@inject('localeStore')
@observer
class InoutCreateModal extends PureComponent<InoutCreateModalProps> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      fieldsValue.inDate = conversionDateTime(fieldsValue.inDate);
      if (!err) this.props.onSubmit(fieldsValue);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const createInoutFields = newInoutFields(this.props.gates);
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
              style={{ marginTop: '10px', width: '20%', left: '40%' }}
            >
              저장
            </Button>
          </Form>
        </Row>
      </>
    );
  }
}

const InoutCreateModalForm = Form.create<InoutCreateModalProps>({ name: 'inoutCreateModal' })(
  InoutCreateModal
);
export default InoutCreateModalForm;
