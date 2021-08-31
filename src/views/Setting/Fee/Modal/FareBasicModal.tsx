import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { IFareBasicObj } from '@models/fare';
import { Button, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { localeStore } from '@store/localeStore';
import { getFareBasicFields } from '@views/Setting/Fee/fields/fareBasic';
import moment from 'moment';
import { EDelYn } from '@/constants/list';

interface IProps extends FormComponentProps {
  farebasic?: IFareBasicObj | null;
  onSubmit: (info: IFareBasicObj) => void;
}

interface IState {}

class FareBasicModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      console.log('handlerSubmit', fieldsValue);
      if (!err) {
        fieldsValue.sn = this.props.farebasic ? this.props.farebasic.sn : '';
        fieldsValue.effectDate = this.props.farebasic
          ? this.props.farebasic.effectDate
          : moment(new Date()).format('yyyy-MM-DD 00:00:00');
        fieldsValue.delYn = this.props.farebasic ? this.props.farebasic.delYn : EDelYn.N;
        this.props.onSubmit(fieldsValue);
      }
    });
  }

  render() {
    const { localeObj } = localeStore;
    const { getFieldDecorator } = this.props.form;
    const gateFieldsConfig = getFareBasicFields(this.props.farebasic);
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
        <Row>{getFormFields(getFieldDecorator, gateFieldsConfig, false, 7)}</Row>
        <Form.Item
          {...submitFormLayout}
          style={{
            marginTop: 32
          }}
        >
          <Button type="primary" htmlType="submit">
            저장
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const FareBasicModalForm = Form.create<IProps>({ name: 'fareBasicModalForm' })(FareBasicModal);
export default FareBasicModalForm;
