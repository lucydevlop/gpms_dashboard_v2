import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import DraggableModal from '@components/DraggableModal';
import { localeStore } from '@store/localeStore';
import { Button, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { IGateObj, IGateOpenTypeObj } from '@models/gate';
import { gateFields } from '@views/Setting/Facility/tabs/fields/gate';
import { EGateOpenActionType } from '@/constants/list';
import ParkingVisitorExternalModalForm from '@views/Setting/Parkinglot/Modal/ParkingVisitorExternalModal';
import OpenMultiTypeModal from '@views/Setting/Facility/tabs/modals/OpenMultiTypeModal';

interface IProps extends FormComponentProps {
  onSubmit: (user: IGateObj) => void;
  gate?: IGateObj;
}

interface IState {
  showOpenTypeModal: boolean;
  openTypes: IGateOpenTypeObj[];
}

class GateModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showOpenTypeModal: false,
      openTypes: this.props.gate?.openType ? this.props.gate?.openType : []
    };
  }

  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      // console.log('handlerSubmit', fieldsValue);
      if (!err) {
        fieldsValue.openType = this.state.openTypes;
        this.props.onSubmit(fieldsValue);
      }
    });
  }

  handlerOpenTypes = (value: IGateOpenTypeObj[]) => {
    //console.log('handlerOpenTypes', value);
    this.setState({ openTypes: value, showOpenTypeModal: false });
  };

  handleShowModalClick = (openType: EGateOpenActionType) => {
    console.log('handleShowModalClick', openType);
    if (openType === EGateOpenActionType.MULTI) {
      this.setState({ showOpenTypeModal: true });
    } else {
      this.setState({ showOpenTypeModal: false });
    }
  };

  render() {
    const { localeObj } = localeStore;
    const { getFieldDecorator } = this.props.form;
    const gateFieldsConfig = gateFields(this.handleShowModalClick, this.props.gate);
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
      <>
        <Form
          onSubmit={(e: BaseSyntheticEvent) => {
            e.preventDefault();
            this.handlerSubmit();
          }}
        >
          <Row>{getFormFields(getFieldDecorator, gateFieldsConfig, true, 10)}</Row>
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
        {this.state.showOpenTypeModal ? (
          <DraggableModal
            title={localeObj['label.setting.gateOpenType' || '게이트 오픈 타입 설정']}
            visible={this.state.showOpenTypeModal}
            width={700}
            onOk={() => this.setState({ showOpenTypeModal: false })}
            onCancel={(): void => {
              this.setState({ showOpenTypeModal: false });
            }}
            footer={[]}
          >
            <OpenMultiTypeModal
              onSubmit={(value: IGateOpenTypeObj[]) => this.handlerOpenTypes(value)}
              openTypes={this.state.openTypes}
            />
          </DraggableModal>
        ) : null}
      </>
    );
  }
}

const GateModalForm = Form.create<IProps>({ name: 'gateModalForm' })(GateModal);
export default GateModalForm;
