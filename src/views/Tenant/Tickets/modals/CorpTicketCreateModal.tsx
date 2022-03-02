import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { ICorpTicketClassObj, ICorpTicketSummaryObj } from '@models/corpTicketClass';
import { Form } from '@ant-design/compatible';
import { Button, Row } from 'antd';
import { corpTicketAddFields } from '@views/Tenant/Tickets/modals/corpTicket';
import { getFormFields } from '@utils/form';

interface IProps extends FormComponentProps {
  corpTicketSummary?: ICorpTicketSummaryObj;
  corpTicketClasses: ICorpTicketClassObj[];
  onSubmit: (value: any) => void;
}

interface IState {}

class CorpTicketCreateModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      //console.log('handlerSubmit', fieldsValue);
      if (!err) this.props.onSubmit(fieldsValue);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const selectCorpTicketClass = this.props.corpTicketClasses.map((p) => {
      return { value: p.sn, label: p.name, color: 'black' };
    });
    const fieldsConfig = corpTicketAddFields(selectCorpTicketClass, this.props.corpTicketSummary);
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
        <Row>{getFormFields(getFieldDecorator, fieldsConfig, true, 3)}</Row>
        <Form.Item
          {...submitFormLayout}
          style={{
            marginTop: 32
          }}
        >
          <Button type="primary" htmlType="submit" style={{ width: '30%', left: '35%' }}>
            저장
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const CorpTicketCreateModalForm = Form.create<IProps>({ name: 'corpTicketCreateModal' })(
  CorpTicketCreateModal
);
export default CorpTicketCreateModalForm;
