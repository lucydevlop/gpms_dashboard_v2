import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { IHolidayObj } from '@models/holiday';
import { Button, Col, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { getHolidayFields } from '@views/Setting/Holiday/Modal/holiday';
import { EDelYn } from '@/constants/list';

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
        fieldsValue.startDate =
          fieldsValue.startDate +
          ' ' +
          ('0' + fieldsValue.startTime.substring(0, 2)).slice(-2) +
          ':' +
          ('0' + fieldsValue.startTime.substring(2, 4)).slice(-2) +
          ':00';
        fieldsValue.endDate =
          fieldsValue.endDate +
          ' ' +
          ('0' + fieldsValue.endTime.substring(0, 2)).slice(-2) +
          ':' +
          ('0' + fieldsValue.endTime.substring(2, 4)).slice(-2) +
          ':59';
        console.log('submit', fieldsValue);
        this.props.onSubmit(fieldsValue);
      }
    });
  }

  render() {
    const { getFieldDecorator, setFieldsValue } = this.props.form;
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
            <Row gutter={24}>
              <Col span={20}>
                <Row gutter={24}>{getFormFields(getFieldDecorator, holidayFields, true, 4)}</Row>
              </Col>
              <Col span={4}>
                {this.props.holiday ? (
                  this.props.holiday.sn ? (
                    <>
                      <Row>
                        <Button htmlType="submit" style={{ marginTop: '5px' }}>
                          수정
                        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ marginTop: '5px', marginLeft: '5px' }}
                          onClick={(e) => setFieldsValue({ ['delYn']: EDelYn.Y })}
                        >
                          삭제
                        </Button>
                      </Row>
                    </>
                  ) : (
                    <Button type="primary" htmlType="submit" style={{ marginTop: '5px' }}>
                      추가
                    </Button>
                  )
                ) : null}
              </Col>
            </Row>
          </Form>
        </Row>
      </>
    );
  }
}

const HolidayModalForm = Form.create<IProps>({ name: 'holidayModal' })(HolidayForm);
export default HolidayModalForm;
