import React, { BaseSyntheticEvent, createRef, PureComponent, RefObject } from 'react';
import { inject, observer } from 'mobx-react';
import { parkinglotStore } from '@store/parkinglotStore';
import { IParkinglotObj, Space } from '@models/parkinglot';
import PageWrapper from '@components/PageWrapper';
import { Button, Card, Input, Radio, Row, Select } from 'antd';
import { Form } from '@ant-design/compatible';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { runInAction, toJS } from 'mobx';
import {
  ParkinglotSettingFields,
  ParkinglotSpaceSettingFields
} from '@views/Setting/Parkinglot/Fields';
import { getFormFields } from '@utils/form';
import { localeStore } from '@/store/localeStore';
import { RedoOutlined } from '@ant-design/icons';
import Col from 'antd/es/grid/col';
import DraggableModal from '@/components/DraggableModal';
import ParkingSpaceSettingModalForm from './Modal/ParkingSpaceSettingModal';
import { number } from 'echarts/core';
import { getGateGroups, updateParkinglot } from '@/api/parkinglot';
import ParkingVisitorExternalModalForm from './Modal/ParkingVisitorExternalModal';
import zdsTips from '@utils/tips';

interface IProps extends FormComponentProps {}
interface IState {
  loading: boolean;
  parkinglot?: IParkinglotObj | null;
  spaceSettingModal: boolean;
  visitorExternalModal: boolean;
  visitorExternalKey?: string | null;
  visitorExternal?: string | null;
  space?: Space | null;
  gates: any[];
  gateGroups: any[];
}

@inject('localeStore', 'parkinglotStore')
@observer
class ParkinglotSetting extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      spaceSettingModal: false,
      visitorExternalModal: false,
      gates: [],
      gateGroups: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    parkinglotStore.initGateList().then(() => {
      const unique: { value: string; label: string }[] = [];
      parkinglotStore.gateList.forEach((gate) => {
        unique.push({ value: gate.gateId, label: gate.gateName });
      });
      this.setState({ gates: unique });
    });
    parkinglotStore.get().then(() => {
      runInAction(() => {
        this.setState({ parkinglot: parkinglotStore.parkinglot });
        this.setState({ space: this.state.parkinglot?.space });
        this.setState({ visitorExternal: this.state.parkinglot?.visitorExternal });
        this.setState({ visitorExternalKey: this.state.parkinglot?.visitorExternalKey });
      });
    });
    parkinglotStore.initGateGroups().then(() => {
      const unique: { value: string; label: string }[] = [];
      parkinglotStore.gateGroups.forEach((gateGroup) => {
        unique.push({ value: gateGroup.gateGroupId, label: gateGroup.gateGroupName });
      });
      this.setState({ gateGroups: unique });
    });
    this.setState({ loading: false });
  }

  onFinish = async () => {
    this.props.form.validateFields((err, fieldsValue) => {
      const sendData: any = {
        parkId: fieldsValue.parkId,
        siteId: fieldsValue.siteid,
        siteName: fieldsValue.sitename,
        ceoname: fieldsValue.ceoname,
        city: fieldsValue.city,
        address: fieldsValue.address,
        saleType: fieldsValue.saleType,
        vehicleDayOption: fieldsValue.vehicleDayOption,
        saupno: fieldsValue.saupno,
        tel: fieldsValue.tel,
        externalSvr: fieldsValue.externalSvr,
        ip: fieldsValue.ip,
        rcsParkId: fieldsValue.rcsParkId,
        visitorExternalKey:
          fieldsValue.visitorExternal === 'On' ? this.state.visitorExternalKey : null,
        visitorExternal: fieldsValue.visitorExternal === 'On' ? this.state.visitorExternal : null,
        space: fieldsValue.space === 'Off' ? null : this.state.space,
        operatingDays: fieldsValue.operatingDays
      };
      if (!err) {
        updateParkinglot(sendData).then((res: any) => {
          const { msg, data } = res;
          if (msg === 'success') {
            runInAction(() => {
              zdsTips.success('주차 정보 변경 완료'), () => this.setState({ parkinglot: data });
            });
          }
        });
      }
    });
  };

  onSpaceSettingModal = () => {
    this.setState({ spaceSettingModal: true });
  };

  offSpaceSettingModal = () => {
    this.setState({ spaceSettingModal: false });
    this.setState({ space: null });
  };

  onVisitorExternalModal = () => {
    this.setState({ visitorExternalModal: true });
  };

  offVisitorExternalModal = () => {
    this.setState({ visitorExternalModal: false });
    this.setState({ visitorExternalKey: null });
    this.setState({ visitorExternal: null });
  };

  SpaceSetting = (value: Space) => {
    this.setState({ space: { gateGroupId: value.gateGroupId, space: Number(value.space) } });
    this.setState({ spaceSettingModal: false });
  };

  VisitorExternalSetting = (value: IParkinglotObj) => {
    this.setState({ visitorExternalKey: value.visitorExternalKey });
    this.setState({ visitorExternal: value.visitorExternal });
    this.setState({ visitorExternalModal: false });
  };

  render() {
    const { localeObj } = localeStore;
    const { getFieldDecorator } = this.props.form;
    const parkinglotFieldsConfig = ParkinglotSettingFields(
      this.state.visitorExternalKey,
      this.state.visitorExternal,
      this.state.space,
      this.state.parkinglot,
      this.onSpaceSettingModal,
      this.offSpaceSettingModal,
      this.onVisitorExternalModal,
      this.offVisitorExternalModal
    );
    if (this.state.loading) return <PageWrapper />;
    return (
      <PageWrapper>
        <Card
          hoverable
          title={
            <span style={{ fontWeight: 500, fontSize: '20px' }}>
              {localeObj['menu.setting.parkinglot' || '주차장기본정보']}
            </span>
          }
          className="thin-card"
          bordered={false}
        >
          <Form
            onSubmit={(e: BaseSyntheticEvent) => {
              e.preventDefault();
              this.onFinish();
            }}
          >
            <Row>{getFormFields(getFieldDecorator, parkinglotFieldsConfig, false, 30)}</Row>
            <Col style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginTop: '20px', width: '150px' }}
              >
                수정
              </Button>
            </Col>
          </Form>
        </Card>
        {this.state.spaceSettingModal ? (
          <DraggableModal
            title={localeObj['label.setting.space' || '만차제어']}
            visible={this.state.spaceSettingModal}
            width={400}
            onOk={() => this.setState({ spaceSettingModal: false })}
            onCancel={(): void => {
              this.setState({ spaceSettingModal: false });
            }}
          >
            <ParkingSpaceSettingModalForm
              onSubmit={(value) => this.SpaceSetting(value)}
              gates={this.state.gates}
              gateGroups={this.state.gateGroups}
              space={this.state.space || undefined}
            />
          </DraggableModal>
        ) : null}
        {this.state.visitorExternalModal ? (
          <DraggableModal
            title={localeObj['label.setting.visitorExternal' || '방문차량 외부연계']}
            visible={this.state.visitorExternalModal}
            width={600}
            onOk={() => this.setState({ visitorExternalModal: false })}
            onCancel={(): void => {
              this.setState({ visitorExternalModal: false });
            }}
          >
            <ParkingVisitorExternalModalForm
              onSubmit={(value) => this.VisitorExternalSetting(value)}
              visitorExternalKey={this.state.visitorExternalKey || undefined}
              visitorExternal={this.state.visitorExternal || undefined}
            ></ParkingVisitorExternalModalForm>
          </DraggableModal>
        ) : null}
      </PageWrapper>
    );
  }
}

const ParkinglotSettingForm = Form.create<IProps>()(ParkinglotSetting);
export default ParkinglotSettingForm;
