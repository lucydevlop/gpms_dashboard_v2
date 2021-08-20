import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import DraggableModal from '@components/DraggableModal';
import { localeStore } from '@store/localeStore';
import { Button, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { IGateObj } from '@models/gate';
import { gateFields } from '@views/Setting/Facility/tabs/fields/gate';
import { IFacilityObj } from '@models/facility';
import { facilityFields } from '@views/Setting/Facility/tabs/fields/facility';
import { displayFields, flowSettingFields } from '@views/Setting/Facility/tabs/fields/display';
import { IDisplayMsgObj } from '@models/display';
import { ELineStatus } from '@/constants/list';

interface IProps extends FormComponentProps {
  onSubmit: (display: IDisplayMsgObj) => void;
  display?: IDisplayMsgObj;
  floweSettingModal?: boolean;
  line1Status?: ELineStatus;
  line2Status?: ELineStatus;
}

interface IState {}

class DisplayModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      console.log('handlerSubmit', fieldsValue);
      if (!err) {
        this.props.onSubmit(fieldsValue);
      }
    });
  }

  render() {
    const { localeObj } = localeStore;
    const { getFieldDecorator } = this.props.form;
    const gateFieldsConfig =
      this.props.floweSettingModal === true
        ? flowSettingFields(this.props.line1Status, this.props.line2Status)
        : displayFields(this.props.display);
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
        <Row>{getFormFields(getFieldDecorator, gateFieldsConfig, true, 6)}</Row>
        <Form.Item
          {...submitFormLayout}
          style={{
            marginTop: 32
          }}
        >
          <Button type="primary" htmlType="submit" style={{ width: '50%', left: '25%' }}>
            저장
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const DisplayModalForm = Form.create<IProps>({ name: 'disPlayModal' })(DisplayModal);
export default DisplayModalForm;
