import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { ITicketObj } from '@models/ticket';
import { Button, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { NewTicketFields } from '../FormFields/FormFields';
import { conversionDateTime } from '@/utils/conversion';

interface ITicketDetailModalProps extends FormComponentProps {
  ticket: ITicketObj;
  onSubmit: (ticket: ITicketObj) => void;
}
interface ITicketDetailModalState {}

@inject('localeStore')
@observer
class TicketDetailModal extends PureComponent<ITicketDetailModalProps, ITicketDetailModalState> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      fieldsValue.effectDate = conversionDateTime(fieldsValue.effectDate, '{y}-{m}-{d} 00:00:00');
      fieldsValue.expireDate = conversionDateTime(fieldsValue.expireDate, '{y}-{m}-{d} 23:59:59');
      if (!err) this.props.onSubmit(fieldsValue);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const ticketDetailFields = NewTicketFields(this.props.ticket);
    return (
      <>
        <Row style={{ marginTop: '10px' }}>
          <Form
            onSubmit={(e: BaseSyntheticEvent) => {
              e.preventDefault();
              this.handlerSubmit();
            }}
          >
            <Row gutter={24}>{getFormFields(getFieldDecorator, ticketDetailFields, true, 12)}</Row>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: '10px', width: '20%', left: '40%' }}
            >
              수정
            </Button>
          </Form>
        </Row>
      </>
    );
  }
}

const TicketDetailModalForm = Form.create<ITicketDetailModalProps>({ name: 'ticketDetailModal' })(
  TicketDetailModal
);

export default TicketDetailModalForm;
