import React, { BaseSyntheticEvent, PureComponent, useState } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { IFareBasicObj, IFareInfoObj, IFarePolicyObj } from '@models/fare';
import { Button, Checkbox, Col, Divider, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { localeStore } from '@store/localeStore';
import { getFareBasicFields } from '@views/Setting/Fee/fields/fareBasic';
import moment from 'moment';
import { EDelYn } from '@/constants/list';
import { getFarePolicyFields } from '@views/Setting/Fee/fields/farePolicy';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

interface IProps extends FormComponentProps {
  farePolicy?: IFarePolicyObj | null;
  fareInfos: IFareInfoObj[];
  onSubmit: (info: IFarePolicyObj) => void;
}

interface IState {
  daysAllCheck: boolean;
}

const { Group: CheckboxGroup } = Checkbox;

class FarePolicyModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      daysAllCheck: false
    };
  }

  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      console.log('handlerSubmit', fieldsValue);
      if (!err) {
        fieldsValue.sn = this.props.farePolicy ? this.props.farePolicy.sn : null;
        fieldsValue.effectDate = this.props.farePolicy
          ? this.props.farePolicy.effectDate
          : moment(new Date()).format('yyyy-MM-DD 00:00:00');
        fieldsValue.expireDate = this.props.farePolicy
          ? this.props.farePolicy.expireDate
          : moment(new Date(9999, 11, 31)).format('yyyy-MM-DD 23:59:59');
        fieldsValue.delYn = this.props.farePolicy ? this.props.farePolicy.delYn : EDelYn.N;
        fieldsValue.basicFareSn = Number(fieldsValue.selectBasicFareSn);
        fieldsValue.addFareSn = Number(fieldsValue.selectAddFareSn);
        fieldsValue.startTime = fieldsValue.timeRange[0].format('HHmm');
        fieldsValue.endTime = fieldsValue.timeRange[1].format('HHmm');
        this.props.onSubmit(fieldsValue);
      }
    });
  }

  render() {
    const { localeObj } = localeStore;
    const { getFieldDecorator } = this.props.form;
    const fareInfos = this.props.fareInfos.map((r) => ({
      label: r.fareName,
      value: r.sn!!.toString(),
      color: 'black'
    }));
    const gateFieldsConfig = getFarePolicyFields(fareInfos, this.props.farePolicy);
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

    const checkGroupLayout = {
      labelCol: {
        xl: 4,
        xs: 4
      },
      wrapperCol: {
        xl: 16,
        xs: 16
      },
      children: null
    };

    return (
      <Form
        onSubmit={(e: BaseSyntheticEvent) => {
          e.preventDefault();
          this.handlerSubmit();
        }}
      >
        <Row>{getFormFields(getFieldDecorator, gateFieldsConfig, false, 7)}</Row>
        <Form.Item
          {...submitFormLayout}
          style={{
            marginTop: 32
          }}
        >
          <Button type="primary" htmlType="submit">
            저장
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const FarePolicyModalForm = Form.create<IProps>({ name: 'farePolicyModalForm' })(FarePolicyModal);
export default FarePolicyModalForm;
