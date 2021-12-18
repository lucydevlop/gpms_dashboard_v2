import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { ITicketObj } from '@models/ticket';
import { Button, Row } from 'antd';
import { getFormFields, ISelectOptions } from '@utils/form';
import { NewTicketFields } from '../FormFields/FormFields';
import { conversionDateTime } from '@/utils/conversion';
import { string2mobile } from '@utils/tools';
import { IDiscountClassObj } from '@models/discountClass';
import { NewFreeTicketFields } from '@views/Ticket/FormFields/FreeFormFields';

interface ITicketModalProps extends FormComponentProps {
  ticket?: ITicketObj;
  onSubmit: (ticket: ITicketObj) => void;
  ticketClasses: ISelectOptions[];
}
interface ITicketDetailModalState {}

@inject('localeStore')
@observer
class FreeTicketModal extends PureComponent<ITicketModalProps, ITicketDetailModalState> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('Ticket', fieldsValue);
      fieldsValue.effectDate = conversionDateTime(fieldsValue.effectDate, '{y}-{m}-{d} 00:00:00');
      fieldsValue.expireDate = conversionDateTime(fieldsValue.expireDate, '{y}-{m}-{d} 23:59:59');
      fieldsValue.tel = fieldsValue.tel ? string2mobile(fieldsValue.tel) : '';
      // console.log('Ticket', fieldsValue);
      if (!err) this.props.onSubmit(fieldsValue);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const ticketDetailFields = NewFreeTicketFields(this.props.ticket, this.props.ticketClasses!!);
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

const FreeTicketModalForm = Form.create<ITicketModalProps>({ name: 'freeTicketModal' })(
  FreeTicketModal
);

export default FreeTicketModalForm;
