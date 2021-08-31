import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { IFareInfoObj } from '@models/fare';
import { Button, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { localeStore } from '@store/localeStore';
import moment from 'moment';
import { EDelYn } from '@/constants/list';
import { getFareInfoFields } from '@views/Setting/Fee/fields/fareInfo';

interface IProps extends FormComponentProps {
  fareInfo?: IFareInfoObj | null;
  onSubmit: (info: IFareInfoObj) => void;
}

interface IState {}

class FareInfoModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      console.log('handlerSubmit', fieldsValue);
      if (!err) {
        fieldsValue.sn = this.props.fareInfo ? this.props.fareInfo.sn : null;
        fieldsValue.effectDate = this.props.fareInfo
          ? this.props.fareInfo.effectDate
          : moment(new Date()).format('yyyy-MM-DD 00:00:00');
        fieldsValue.expireDate = this.props.fareInfo
          ? this.props.fareInfo.expireDate
          : moment(new Date(9999, 11, 31)).format('yyyy-MM-DD 23:59:59');
        fieldsValue.delYn = this.props.fareInfo ? this.props.fareInfo.delYn : EDelYn.N;
        this.props.onSubmit(fieldsValue);
      }
    });
  }

  render() {
    const { localeObj } = localeStore;
    const { getFieldDecorator } = this.props.form;
    const gateFieldsConfig = getFareInfoFields(this.props.fareInfo);
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

const FareInfoModalForm = Form.create<IProps>({ name: 'FareInfoModalForm' })(FareInfoModal);
export default FareInfoModalForm;
