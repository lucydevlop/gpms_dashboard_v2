/*
import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { ITicketObj } from '@models/ticket';
import { Button, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { conversionDateTime } from '@/utils/conversion';
import { string2mobile } from '@utils/tools';
import { IVisitorObj } from '@models/visitor';

interface IVisitorModalProps extends FormComponentProps {
  ticket?: IVisitorObj;
  onSubmit: (ticket: IVisitorObj) => void;
}
interface IVisitorModalState {}

@inject('localeStore')
@observer
class VisitorModal extends PureComponent<IVisitorModalProps, IVisitorModalState> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('Ticket', fieldsValue);
      fieldsValue.effectDate = conversionDateTime(fieldsValue.effectDate, '{y}-{m}-{d} 00:00:00');
      fieldsValue.expireDate = conversionDateTime(fieldsValue.expireDate, '{y}-{m}-{d} 23:59:59');
      fieldsValue.tel = string2mobile(fieldsValue.tel);
      // console.log('Ticket', fieldsValue);
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

const VisitorModalForm = Form.create<IVisitorModalProps>({ name: 'visitorModal' })(VisitorModal);

export default VisitorModalForm;
*/
