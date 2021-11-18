import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { IHolidayObj } from '@models/holiday';
import { Button, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { getHolidayFields } from '@views/Setting/Holiday/Modal/holiday';

interface IProps extends FormComponentProps {
  holiday?: IHolidayObj;
  onSubmit: (info: IHolidayObj) => void;
}

interface IState {}

class HolidayForm extends PureComponent<IProps, IState> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      fieldsValue.isWorking = fieldsValue.working === 'ON';
      if (!err) {
        console.log('submit', fieldsValue);
        this.props.onSubmit(fieldsValue);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const holidayFields = getHolidayFields(this.props.holiday);
    return (
      <>
        <Row style={{ marginTop: '10px' }}>
          <Form
            style={{ display: 'flex' }}
            onSubmit={(e: BaseSyntheticEvent) => {
              e.preventDefault();
              this.handlerSubmit();
            }}
          >
            <Row gutter={24}>{getFormFields(getFieldDecorator, holidayFields, true, 2)}</Row>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: '5px', width: '20%', left: '10%' }}
            >
              {this.props.holiday ? (this.props.holiday.sn ? '수정' : '추가') : null}
            </Button>
          </Form>
        </Row>
      </>
    );
  }
}

const HolidayModalForm = Form.create<IProps>({ name: 'holidayModal' })(HolidayForm);
export default HolidayModalForm;
