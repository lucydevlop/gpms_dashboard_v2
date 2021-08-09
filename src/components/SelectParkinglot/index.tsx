import React from 'react';
import DraggableModal from '@components/DraggableModal';
import LocaleStore from '@store/localeStore';
import SearchForm from '@components/StandardTable/SearchForm';
import { searchParkinglotFields } from './SearchFields';
import { IParkinglotObj, IParkinglotSelectReq } from '@models/parkinglot';
import { Button, Form, Input, Select } from 'antd';
import { cityOpt, ECity } from '@/constants/list';

interface InjectedProps {
  localeStore: LocaleStore;
  parkinglotSelectedModal: boolean;
  handleModal: (value: boolean) => void;
  parkinglots: Array<IParkinglotObj>;
  onSelected: (value: number) => void;
}

interface ISelectParkinglotState {
  area?: ECity;
  item: any[];
  parkinglotId?: number;
}

class SelectParkinglot extends React.Component<InjectedProps, ISelectParkinglotState> {
  constructor(props: InjectedProps) {
    super(props);
    this.state = {
      item: this.props.parkinglots
    };
  }

  getSearchData = (info: IParkinglotSelectReq) => {
    console.log('getSearchData', info.name);
  };

  handleAreaChange = (event: any) => {
    console.log('handleAreaChange', event);
    const item = this.state.item.filter((i) => i.city === event);
    this.setState({ area: event, item: item }, () => {});
  };

  handleParkinglotChange = (event: any) => {
    console.log('handleParkinglotChange', event);
    this.setState({ parkinglotId: event });
  };

  handlerSubmit() {
    if (!this.state.parkinglotId) return;
    this.props.onSelected(this.state.parkinglotId as number);
    this.props.handleModal(false);
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    const tailLayout = {
      wrapperCol: {
        offset: 11,
        span: 16
      }
    };

    const { localeObj } = this.props.localeStore;
    const searchFields = searchParkinglotFields();
    const { Option } = Select;
    return (
      <>
        <DraggableModal
          title={localeObj['label.parkinglot.disability'] || '주차장 선택'}
          visible={this.props.parkinglotSelectedModal}
          width={800}
          onOk={() => this.props.handleModal(false)}
          onCancel={(): void => {
            this.props.handleModal(false);
          }}
        >
          <Form {...formItemLayout}>
            <Form.Item label={'지역'} id={'area'}>
              <Select size="middle" onChange={(value) => this.handleAreaChange(value)}>
                {cityOpt.map(
                  (item) =>
                    item.value && (
                      <Option key={item.value} value={item.value} title={item.label}>
                        {item.label}
                      </Option>
                    )
                )}
              </Select>
            </Form.Item>
            <Form.Item
              label={'주차장명'}
              rules={[{ required: true, message: 'Please select your country!' }]}
            >
              {/*<Input />*/}
              {/*<Select size="middle" onChange={(value) => this.handleParkinglotChange(value)}>*/}
              {/*  {this.state.item.map(*/}
              {/*    (item: IParkinglotObj) =>*/}
              {/*      item.parkinglotId && (*/}
              {/*        <Option*/}
              {/*          key={item.parkinglotId}*/}
              {/*          value={item.parkinglotId}*/}
              {/*          title={item.parkinglotName}*/}
              {/*        >*/}
              {/*          {item.parkinglotName}*/}
              {/*        </Option>*/}
              {/*      )*/}
              {/*  )}*/}
              {/*</Select>*/}
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" onClick={() => this.handlerSubmit()}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </DraggableModal>
      </>
    );
  }
}

export default SelectParkinglot;
