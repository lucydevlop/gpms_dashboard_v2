import { IInoutObj } from '@/models/inout';
import { Space } from '@/models/parkinglot';
import { conversionDateTime } from '@/utils/conversion';
import { getFormFields } from '@/utils/form';
import { Form } from '@ant-design/compatible';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Button, Row } from 'antd';
import { inject, observer } from 'mobx-react';
import React, { BaseSyntheticEvent, PureComponent, Component } from 'react';
import { ParkinglotSpaceSettingFields } from '../Fields';

interface ParkingSpaceSettingModalProps extends FormComponentProps {
  onSubmit: (space: any) => void;
  gates: any[];
  space?: Space;
  gateGroups: any[];
}
@inject('localeStore')
@observer
class ParkingSpaceSettingModal extends PureComponent<ParkingSpaceSettingModalProps> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      this.props.onSubmit(fieldsValue);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const parkingSpaceSettingFields = ParkinglotSpaceSettingFields(
      this.props.space || undefined,
      this.props.gates,
      this.props.gateGroups
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
            <Row>{getFormFields(getFieldDecorator, parkingSpaceSettingFields, true, 6)}</Row>
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

const ParkingSpaceSettingModalForm = Form.create<ParkingSpaceSettingModalProps>({
  name: 'parkingSpaceSettingModalForm'
})(ParkingSpaceSettingModal);
export default ParkingSpaceSettingModalForm;
