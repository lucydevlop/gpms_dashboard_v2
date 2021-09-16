import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { IBarcodeClassObj } from '@models/barcode';
import { IDiscountClassObj } from '@models/discountClass';
import { inject, observer } from 'mobx-react';
import { Form } from '@ant-design/compatible';
import { Button, Row } from 'antd';
import { getFormFields, ISelectOptions } from '@utils/form';
import { conversionDateTime } from '@utils/conversion';
import { BarcodeClassFields } from '@views/Setting/Product/tabs/fields/barcode';

interface IProps extends FormComponentProps {
  barcodeClass?: IBarcodeClassObj;
  onSubmit: (info: IBarcodeClassObj) => void;
  discountClasses: IDiscountClassObj[];
  discountSelectClasses: ISelectOptions[];
}

interface IState {}

@inject('localeStore')
@observer
class BarcodeClassModal extends PureComponent<IProps, IState> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      const discountClass: IDiscountClassObj = this.props.discountClasses.filter((e) => {
        return e.sn === Number(fieldsValue.discountClassSn);
      })[0];
      fieldsValue.effectDate = conversionDateTime(discountClass.effectDate, '{y}-{m}-{d} 00:00:00');
      fieldsValue.expireDate = conversionDateTime(discountClass.expireDate, '{y}-{m}-{d} 23:59:59');
      if (!err) {
        console.log('handlerSubmit', fieldsValue);
        this.props.onSubmit(fieldsValue);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const Fields = BarcodeClassFields(this.props.barcodeClass, this.props.discountSelectClasses);
    return (
      <>
        <Row style={{ marginTop: '10px' }}>
          <Form
            onSubmit={(e: BaseSyntheticEvent) => {
              e.preventDefault();
              this.handlerSubmit();
            }}
          >
            <Row gutter={24}>{getFormFields(getFieldDecorator, Fields, true, 4)}</Row>
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

const BarcodeClassModalForm = Form.create<IProps>({ name: 'barcodeClassModal' })(BarcodeClassModal);
export default BarcodeClassModalForm;
