import React, { PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { IFacilityObj } from '@models/facility';
import { Form } from '@ant-design/compatible';
import { Button, Checkbox, Radio, Row, Select } from 'antd';
import { localeStore } from '@store/localeStore';
import { inject, observer } from 'mobx-react';
import { breakerStatusOpt, EBreakerStatus } from '@/constants/list';
import zdsTips from '@utils/tips';

interface IControlProps extends FormComponentProps {
  facility: IFacilityObj;
  onExecute: (facility: IFacilityObj, status: EBreakerStatus) => void;
}

interface IControlState {
  status: EBreakerStatus;
}

@inject('localeStore')
@observer
class ControlModal extends PureComponent<IControlProps, IControlState> {
  handleOnChange = (e: any) => {
    this.setState({ status: e.target.value });
  };

  handlerSubmit() {
    if (this.props.facility.status === 'XUPLOCK' && this.state.status === EBreakerStatus.UNLOCK) {
      zdsTips.error('수동 열림고정은 해제 할 수 없습니다');
    } else {
      // console.log('handlerSubmit', this.state.status);
      this.props.onExecute(this.props.facility, this.state.status);
    }
  }

  render() {
    const { Option } = Select;
    const { localeObj } = localeStore;
    const info = this.props.facility.status
      ? breakerStatusOpt.find((item) => this.props.facility.status === item.value)
      : { value: '', label: '-', color: 'gray' };
    return (
      <>
        <Row style={{ marginTop: '10px' }}>
          <Form>
            <Form.Item label="현상태">
              <span className="ant-form-text" style={{ color: info?.color }}>
                {info?.label}
              </span>
            </Form.Item>
            <Form.Item
              // name="select"
              hasFeedback
            >
              <Radio.Group onChange={(e) => this.handleOnChange(e)} className="radio-group">
                <Radio value="UP">{'열림'}</Radio>
                <Radio value="DOWN">{'닫힘'}</Radio>
                <Radio value="UPLOCK">{'열림고정'}</Radio>
                <Radio value="UNLOCK">{'고정해제'}</Radio>
              </Radio.Group>
              <Button type="primary" onClick={() => this.handlerSubmit()}>
                {localeObj['label.excute'] || '실행'}
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </>
    );
  }
}

const ControlModalForm = Form.create<IControlProps>({ name: 'controlParkinglotModal' })(
  ControlModal
);

export default ControlModalForm;
