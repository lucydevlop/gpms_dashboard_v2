import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { Button, Row } from 'antd';
import { getFormFields, ISelectOptions } from '@utils/form';
import { conversionDateTime } from '@/utils/conversion';
import { IDiscountClassObj } from '@models/discountClass';
import { ICorpTicketClassObj } from '@models/corpTicketClass';
import { corpDiscountFields } from '@views/Setting/Product/tabs/fields/corpTicketClass';

interface ICorpTicketModalProps extends FormComponentProps {
  discount?: ICorpTicketClassObj;
  onSubmit: (discount: ICorpTicketClassObj) => void;
  discountSelectClasses: ISelectOptions[];
  discountClasses: IDiscountClassObj[];
}
interface ICorpTicketModalState {}

@inject('localeStore')
@observer
class CorpTicketModal extends PureComponent<ICorpTicketModalProps, ICorpTicketModalState> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      console.log('handlerSubmit', fieldsValue);
      const discountClass: IDiscountClassObj = this.props.discountClasses.filter((e) => {
        return e.sn === Number(fieldsValue.discountClassSn);
      })[0];
      fieldsValue.effectDate = conversionDateTime(discountClass.effectDate, '{y}-{m}-{d} 00:00:00');
      fieldsValue.expireDate = conversionDateTime(discountClass.expireDate, '{y}-{m}-{d} 23:59:59');
      fieldsValue.onceMax = fieldsValue.onceMax === '무제한' ? 999999999 : fieldsValue.onceMax;
      fieldsValue.dayMax = fieldsValue.dayMax === '무제한' ? 999999999 : fieldsValue.dayMax;
      fieldsValue.monthMax = fieldsValue.monthMax === '무제한' ? 999999999 : fieldsValue.monthMax;
      if (!err) this.props.onSubmit(fieldsValue);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const CorpDiscountFields = corpDiscountFields(
      this.props.discount,
      this.props.discountSelectClasses,
      this.props.form
    );
    return (
      <>
        <Row style={{ marginTop: '10px' }}>
          <Form
            onSubmit={(e: BaseSyntheticEvent) => {
              e.preventDefault();
              this.handlerSubmit();
            }}
          >
            <Row gutter={24}>{getFormFields(getFieldDecorator, CorpDiscountFields, true, 10)}</Row>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: '10px', width: '20%', left: '40%' }}
            >
              등록
            </Button>
          </Form>
        </Row>
      </>
    );
  }
}

const CorpTicketModalForm = Form.create<ICorpTicketModalProps>({ name: 'corpTicketModal' })(
  CorpTicketModal
);

export default CorpTicketModalForm;
