import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { ITicketClassObj } from '@models/ticketClass';
import { Button, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { ticketClassFields } from '@views/Setting/Product/tabs/fields/ticketClass';
import moment from 'moment';
import { EDelYn } from '@/constants/list';

interface IProps extends FormComponentProps {
  onSubmit: (ticketClass: ITicketClassObj) => void;
  ticketClass?: ITicketClassObj;
}

interface IState {}

class TicketClassModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        fieldsValue.startTime = fieldsValue.timeRange
          ? fieldsValue.timeRange[0].format('HHmm')
          : '0000';
        fieldsValue.endTime = fieldsValue.timeRange
          ? fieldsValue.timeRange[1].format('HHmm')
          : '2400';
        fieldsValue.sn = this.props.ticketClass ? this.props.ticketClass.sn : null;
        fieldsValue.effectDate = this.props.ticketClass
          ? this.props.ticketClass.effectDate
          : moment(new Date()).format('yyyy-MM-DD 00:00:00');
        fieldsValue.expireDate = this.props.ticketClass
          ? this.props.ticketClass.expireDate
          : moment(new Date(9999, 11, 31)).format('yyyy-MM-DD 23:59:59');
        fieldsValue.period = { type: fieldsValue.periodType, number: fieldsValue.periodNumber };
        //fieldsValue.delYn = this.props.ticketClass ? this.props.ticketClass.delYn : EDelYn.N;
        //console.log('ticketClass submit', fieldsValue);
        this.props.onSubmit(fieldsValue);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
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
    const gateFieldsConfig = ticketClassFields(this.props.ticketClass);
    return (
      <Form
        onSubmit={(e: BaseSyntheticEvent) => {
          e.preventDefault();
          this.handlerSubmit();
        }}
      >
        <Row>{getFormFields(getFieldDecorator, gateFieldsConfig, true, 11)}</Row>
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

const TicketClassModalForm = Form.create<IProps>({ name: 'ticketClassModal' })(TicketClassModal);
export default TicketClassModalForm;
