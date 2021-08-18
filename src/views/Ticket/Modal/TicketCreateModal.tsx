import React, { BaseSyntheticEvent, PureComponent, Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form } from '@ant-design/compatible';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { ITicketObj } from '@models/ticket';
import { NewTicketFields } from '@views/Ticket/FormFields/FormFields';
import { Button, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { conversionDateTime } from '@utils/conversion';

interface ITicketCreateModalProps extends FormComponentProps {
  onSubmit: (ticket: ITicketObj) => void;
}
@inject('localeStore')
@observer
class TicketCreateModal extends PureComponent<ITicketCreateModalProps> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      fieldsValue.effectDate = conversionDateTime(fieldsValue.effectDate, '{y}-{m}-{d} 00:00:00');
      fieldsValue.expireDate = conversionDateTime(fieldsValue.expireDate, '{y}-{m}-{d} 23:59:59');
      if (!err) this.props.onSubmit(fieldsValue);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const createTicketFields = NewTicketFields();
    return (
      <>
        <Row style={{ marginTop: '10px' }}>
          <Form
            onSubmit={(e: BaseSyntheticEvent) => {
              e.preventDefault();
              this.handlerSubmit();
            }}
          >
            <Row>{getFormFields(getFieldDecorator, createTicketFields, true, 12)}</Row>
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

const TicketCreateModalForm = Form.create<ITicketCreateModalProps>({ name: 'ticketCreateModal' })(
  TicketCreateModal
);
export default TicketCreateModalForm;
