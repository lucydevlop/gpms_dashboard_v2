import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { ITicketObj } from '@models/ticket';
import { Button, Row } from 'antd';
import { getFormFields, ISelectOptions } from '@utils/form';
import { conversionDate, conversionDateTime } from '@/utils/conversion';
import { string2mobile } from '@utils/tools';
import { IDiscountClassObj } from '@models/discountClass';
import { DiscountFields } from '@views/Setting/Product/tabs/fields/discount';

interface IDiscounttModalProps extends FormComponentProps {
  discount?: IDiscountClassObj;
  onSubmit: (discount: IDiscountClassObj) => void;
}
interface IDiscountModalState {}

@inject('localeStore')
@observer
class DiscountModal extends PureComponent<IDiscounttModalProps, IDiscountModalState> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      fieldsValue.effectDate = conversionDateTime(fieldsValue.effectDate, '{y}-{m}-{d} 00:00:00');
      fieldsValue.expireDate = conversionDateTime(fieldsValue.expireDate, '{y}-{m}-{d} 23:59:59');
      if (!err) this.props.onSubmit(fieldsValue);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const discountFields = DiscountFields(this.props.discount);
    return (
      <>
        <Row style={{ marginTop: '10px' }}>
          <Form
            onSubmit={(e: BaseSyntheticEvent) => {
              e.preventDefault();
              this.handlerSubmit();
            }}
          >
            <Row gutter={24}>{getFormFields(getFieldDecorator, discountFields, true, 9)}</Row>
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

const DiscountModalForm = Form.create<IDiscounttModalProps>({ name: 'discountModal' })(
  DiscountModal
);

export default DiscountModalForm;
