import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import DraggableModal from '@components/DraggableModal';
import { localeStore } from '@store/localeStore';
import { Button, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { IGateObj } from '@models/gate';
import { gateFields } from '@views/Setting/Facility/tabs/fields/gate';

interface IProps extends FormComponentProps {
  onSubmit: (user: IGateObj) => void;
  gate?: IGateObj;
}

interface IState {}

class GateModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('handlerSubmit', fieldsValue);
      if (!err) {
        this.props.onSubmit(fieldsValue);
      }
    });
  }

  render() {
    const { localeObj } = localeStore;
    const { getFieldDecorator } = this.props.form;
    const gateFieldsConfig = gateFields(this.props.gate);
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
        <Row>{getFormFields(getFieldDecorator, gateFieldsConfig, true, 7)}</Row>
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

const GateModalForm = Form.create<IProps>({ name: 'gateModalForm' })(GateModal);
export default GateModalForm;
