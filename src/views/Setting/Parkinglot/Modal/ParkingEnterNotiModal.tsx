import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Form } from '@ant-design/compatible';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { EnterNoti } from '@models/parkinglot';
import { Button, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { ParkinglotEnterNotiFields } from '@views/Setting/Parkinglot/Fields';

interface IProps extends FormComponentProps {
  onSubmit: (enterNoti: any) => void;
  enterNoti?: EnterNoti;
}

@inject('localeStore')
@observer
class ParkingEnterNotiModal extends PureComponent<IProps> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      this.props.onSubmit(fieldsValue);
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const parkingEnterNotiFields = ParkinglotEnterNotiFields(this.props.enterNoti);
    return (
      <>
        <Row style={{ marginTop: '10px' }}>
          <Form
            onSubmit={(e: BaseSyntheticEvent) => {
              e.preventDefault();
              this.handlerSubmit();
            }}
          >
            <Row>{getFormFields(getFieldDecorator, parkingEnterNotiFields, true, 6)}</Row>
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

const ParkingEnterNotiModalForm = Form.create<IProps>({ name: 'ParkingEnterNotiModal' })(
  ParkingEnterNotiModal
);
export default ParkingEnterNotiModalForm;
