import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { Button, Col, Input, Row } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface IProps extends FormComponentProps {
  onSubmit: (vehicleNo: string) => void;
  message?: string;
}

interface IState {
  message?: string;
}

class VehicleSearch extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      message: props.message
    };
  }

  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) this.props.onSubmit(fieldsValue.vehicleNo);
      this.props.form.resetFields();
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Row
          style={{
            marginTop: '10px',
            border: '1px solid #777A8B',
            backgroundColor: '#fff',
            justifyContent: 'center',
            borderRadius: '3px',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)'
          }}
        >
          {/*<Col span={24}>*/}
          {/*  */}
          {/*</Col>*/}
          <Row>
            <Form
              style={{}}
              onSubmit={(e: BaseSyntheticEvent) => {
                e.preventDefault();
                this.handlerSubmit();
              }}
            >
              <Row style={{ margin: '1rem 0' }}>
                <span style={{ fontSize: '1rem' }}>차량번호 4자리를 입력하세요</span>
              </Row>
              <Row style={{ margin: '7px', justifyContent: 'center' }}>
                <Form.Item>
                  {getFieldDecorator('vehicleNo', {
                    rules: [{ required: true }]
                  })(<Input onChange={() => this.setState({ message: '' })} />)}
                </Form.Item>
              </Row>
              <Row>{this.state.message ? <span>{this.state.message}</span> : null}</Row>
              <Row style={{ margin: '7px 7px 1rem 7px', justifyContent: 'center' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  //style={{ marginTop: '10px', width: '20%', left: '40%' }}
                >
                  <SearchOutlined /> 검색
                </Button>
              </Row>
            </Form>
          </Row>
        </Row>
      </>
    );
  }
}

const VehicleSearchForm = Form.create<IProps>({ name: 'vehicleSearch' })(VehicleSearch);
export default VehicleSearchForm;
