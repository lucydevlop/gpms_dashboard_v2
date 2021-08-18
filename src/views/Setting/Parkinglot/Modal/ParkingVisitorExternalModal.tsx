import { IInoutObj } from '@/models/inout';
import { IParkinglotObj, Space } from '@/models/parkinglot';
import { conversionDateTime } from '@/utils/conversion';
import { getFormFields } from '@/utils/form';
import { Form } from '@ant-design/compatible';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Button, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { BaseSyntheticEvent, PureComponent, Component } from 'react';
import { ParkinglotSpaceSettingFields, ParkingVisitorExternalFields } from '../Fields';

interface ParkingVisitorExternalModalProps extends FormComponentProps {
  onSubmit: (value: any) => void;
  visitorExternal?: string;
  visitorExternalKey?: string;
}
@inject('localeStore')
@observer
class ParkingVisitorExternalModal extends PureComponent<ParkingVisitorExternalModalProps> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      this.props.onSubmit(fieldsValue);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const parkingVisitorExternalFields = ParkingVisitorExternalFields(
      this.props.visitorExternal,
      this.props.visitorExternalKey
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
            <Row>{getFormFields(getFieldDecorator, parkingVisitorExternalFields, true, 6)}</Row>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: '10px', width: '50%', left: '25%' }}
            >
              저장
            </Button>
          </Form>
        </Row>
      </>
    );
  }
}

const ParkingVisitorExternalModalForm = Form.create<ParkingVisitorExternalModalProps>({
  name: 'parkingVisitorExternalModalForm'
})(ParkingVisitorExternalModal);
export default ParkingVisitorExternalModalForm;
