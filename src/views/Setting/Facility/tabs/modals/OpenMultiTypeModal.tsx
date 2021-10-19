import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { IGateOpenTypeObj } from '@models/gate';
import { inject, observer } from 'mobx-react';
import { Button, Row, Select, Form, Divider, Input, Col } from 'antd';
import { EDelYn, EGateOpenActionType, gateOpenActionTypeOpt } from '@/constants/list';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form';

interface IProps {
  openTypes: IGateOpenTypeObj[];
  onSubmit: (openTypes: any) => void;
}

interface IState {
  openTypes: IGateOpenTypeObj[];
  formRef: React.RefObject<FormInstance>;
}

@inject('localeStore')
@observer
class OpenMultiTypeModal extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      openTypes: this.props.openTypes ? this.props.openTypes : [],
      formRef: React.createRef<FormInstance>()
    };
  }

  handlerSubmit = (values: any) => {
    this.state.formRef.current?.validateFields().then((values: any) => {
      //console.log('VALUES', values.openTypeForm);
      this.props.onSubmit(values.openTypeForm);
    });
    //this.handlerSubmit(values);
  };

  render() {
    //console.log('openMultiTypeModal openTypes', this.state.openTypes);
    return (
      <>
        <Form
          onFinish={this.handlerSubmit}
          ref={this.state.formRef}
          initialValues={this.state.openTypes}
        >
          <Row style={{ marginTop: '10px' }}>
            <Form.List initialValue={this.state.openTypes} name="openTypeForm">
              {(fields, { add, remove }) => (
                <>
                  <Row gutter={24}>
                    {fields.map((field, index) => (
                      <div key={field.key} style={{ display: 'contents' }}>
                        <Col span={8} style={{ display: 'block' }}>
                          <Form.Item
                            label="타입"
                            name={[index, 'openAction']}
                            rules={[{ required: true }]}
                          >
                            <Select>
                              <Select.Option value="NONE">모두허용</Select.Option>
                              <Select.Option value="RECOGNITION">인식차량허용</Select.Option>
                              <Select.Option value="RESTRICT">등록차량허용</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={6} style={{ display: 'block' }}>
                          <Form.Item
                            name={[index, 'startTime']}
                            label="시작시간"
                            rules={[{ required: true }]}
                          >
                            <Input placeholder="ex)0000" />
                          </Form.Item>
                        </Col>
                        <Col span={6} style={{ display: 'block' }}>
                          <Form.Item
                            name={[index, 'endTime']}
                            label="종료시간"
                            rules={[{ required: true }]}
                          >
                            <Input placeholder="ex)2400" />
                          </Form.Item>
                        </Col>
                        <Col span={4} style={{ display: 'block' }}>
                          {fields.length > 1 ? (
                            <Button
                              danger
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                              icon={<MinusCircleOutlined />}
                            >
                              삭제
                            </Button>
                          ) : null}
                        </Col>
                      </div>
                    ))}
                  </Row>
                  <Row gutter={24} style={{ margin: 0 }}>
                    <Col>
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          style={{ width: '100%' }}
                          icon={<PlusOutlined />}
                        >
                          추가
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}
            </Form.List>
            <Row>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Row>
          </Row>
        </Form>
      </>
    );
  }
}

// const OpenMultiTypeModalForm = Form.create<IProps>({})(OpenMultiTypeModal);
export default OpenMultiTypeModal;
