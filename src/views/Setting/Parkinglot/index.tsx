import React, { BaseSyntheticEvent, createRef, PureComponent, RefObject } from 'react';
import { inject, observer } from 'mobx-react';
import { parkinglotStore } from '@store/parkinglotStore';
import { IParkinglotObj } from '@models/parkinglot';
import PageWrapper from '@components/PageWrapper';
import { Button, Input, Radio, Row, Select } from 'antd';
import { Form } from '@ant-design/compatible';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { runInAction } from 'mobx';
import { ParkinglotSettingFields } from '@views/Setting/Parkinglot/Fields';
import { getFormFields } from '@utils/form';

interface IProps extends FormComponentProps {}
interface IState {
  loading: boolean;
  parkinglot?: IParkinglotObj | null;
  lotFullYn: boolean;
}

@inject('localeStore', 'parkinglotStore')
@observer
class ParkinglotSetting extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      lotFullYn: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    parkinglotStore.get().then(() => {
      runInAction(() => {
        this.setState({ parkinglot: parkinglotStore.parkinglot });
      });
    });
    this.setState({ loading: false });
  }

  onFinish = async () => {
    this.props.form.validateFields((err, fieldsValue) => {
      console.log('onFinish', fieldsValue);
      // if (!err) {
      //   let timeList: number[] = [];
      //   if (values.createTm && values.createTm.length) {
      //     timeList = getQueryRangeDate(values.createTm);
      //   }
      //
      //   this.props.submit({
      //     ...values,
      //     // @ts-ignore
      //     createTm: timeList
      //   });
      // }
    });
  };

  onFinishFailed = (val: any) => {
    console.log('onFinishFailed', val);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const parkinglotFieldsConfig = ParkinglotSettingFields(this.state.parkinglot);
    if (this.state.loading) return <PageWrapper />;
    console.log('renderForm', this.state.parkinglot?.sitename);
    return (
      <PageWrapper>
        <Form
          onSubmit={(e: BaseSyntheticEvent) => {
            e.preventDefault();
            this.onFinish();
          }}
        >
          <Row>{getFormFields(getFieldDecorator, parkinglotFieldsConfig, false, 30)}</Row>
        </Form>
      </PageWrapper>
    );
  }
}

const ParkinglotSettingForm = Form.create<IProps>()(ParkinglotSetting);
export default ParkinglotSettingForm;
