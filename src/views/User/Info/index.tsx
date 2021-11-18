import React, { BaseSyntheticEvent } from 'react';
import PageWrapper from '@components/PageWrapper';
import { inject, observer } from 'mobx-react';
import { Button, Col, Input, Row } from 'antd';
import { Form } from '@ant-design/compatible';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { SearchOutlined } from '@ant-design/icons';
import zdsTips from '@utils/tips';
import { userStore } from '@store/userStore';
import { changePassword } from '@api/user';
import { runInAction } from 'mobx';

interface IProps extends FormComponentProps {}
interface IState {
  password: string;
  newPassword: string;
  confirmPassword: string;
  confirmDirty: boolean;
}

@inject('userStore', 'localeStore')
@observer
class UserInfo extends React.PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
      confirmPassword: '',
      confirmDirty: false
    };
  }
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        // console.log('userInfo', userStore.userInfo);
        // console.log('handlerSubmit', fieldsValue);
        const data: any = {
          idx: userStore.userInfo.idx,
          password: fieldsValue.password,
          newPassword: fieldsValue.newPassword,
          confirmPassword: fieldsValue.confirmPassword
        };
        changePassword(data)
          .then((res: any) => {
            const { msg, data } = res;
            if (msg === 'success') {
              runInAction(() => {
                zdsTips.success('비밀번호 정상적으로 변경 되었습니다');
              });
            }
          })
          .catch(() => {
            runInAction(() => {
              zdsTips.error('비밀번호 변경 실패하였습니다');
            });
          })
          .finally(() => {});
      }
    });
  }

  handleConfirmBlur = (e: { target: { value: any } }) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  checkConfirm = (rule: any, value: any, callback: any) => {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('newPassword')) {
      callback('입력한 두 개의 비밀번호가 일치하지 않습니다');
    } else {
      callback();
    }
  };

  checkPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    const { getFieldValue } = this.props.form;
    if (!value) {
      callback('');
    } else {
      if (value.length < 6) {
        callback('6자리 이상으로 입력하세요');
      } else {
        if (value && value === getFieldValue('password')) {
          callback('기존 비밀번호 동일합니다');
        }
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirmPassword'], { force: true });
        }
        callback();
      }
    }
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 12
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 12
        }
      }
    };
    return (
      <PageWrapper>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: '1rem' }}>
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
              <Row>
                <Form
                  {...formItemLayout}
                  layout={'horizontal'}
                  style={{ margin: '2rem 0' }}
                  onSubmit={(e: BaseSyntheticEvent) => {
                    e.preventDefault();
                    this.handlerSubmit();
                  }}
                >
                  <Row style={{ margin: '1rem 0', justifyContent: 'center' }}>
                    {/*<span style={{ fontSize: '1rem', marginRight: '10px' }}>현재 비밀번호</span>*/}
                    <Form.Item label={'현재 비밀번호'} style={{ textAlign: 'center' }}>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: '입력하세요' }]
                      })(<Input.Password style={{ width: 220, maxWidth: 220 }} />)}
                    </Form.Item>
                  </Row>
                  {/*<Row style={{ margin: '1rem 0' }}>*/}
                  {/*  <span style={{ fontSize: '1rem' }}>새 비밀번호</span>*/}
                  {/*</Row>*/}
                  <Row style={{ margin: '1rem 0', justifyContent: 'center' }}>
                    <Form.Item label={'새 비밀번호'} style={{ textAlign: 'center' }} hasFeedback>
                      {getFieldDecorator('newPassword', {
                        validateTrigger: ['onBlur', 'onChange'],
                        rules: [
                          {
                            required: true,
                            message: '비밀번호를 입력하세요'
                          },
                          { validator: this.checkPassword }
                        ]
                      })(<Input.Password style={{ width: 220, maxWidth: 220 }} />)}
                    </Form.Item>
                  </Row>
                  {/*<Row style={{ margin: '1rem 0' }}>*/}
                  {/*  <span style={{ fontSize: '1rem' }}>새 비밀번호 확인</span>*/}
                  {/*</Row>*/}
                  <Row style={{ margin: '1rem 0', justifyContent: 'center' }}>
                    <Form.Item label={'비밀번호 확인'} style={{ textAlign: 'center' }} hasFeedback>
                      {getFieldDecorator('confirmPassword', {
                        validateTrigger: ['onBlur', 'onChange'],
                        rules: [
                          {
                            required: true,
                            message: '비밀번호를 확인해주세요'
                          },
                          { validator: this.checkConfirm }
                        ]
                      })(
                        <Input.Password
                          onBlur={this.handleConfirmBlur}
                          style={{ width: 220, maxWidth: 220 }}
                        />
                      )}
                    </Form.Item>
                  </Row>
                  <Row style={{ margin: '7px 7px 1rem 7px', justifyContent: 'center' }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: '50%', fontWeight: 600 }}
                    >
                      저장
                    </Button>
                  </Row>
                </Form>
              </Row>
            </Row>
          </Col>
        </Row>
      </PageWrapper>
    );
  }
}

export default Form.create<IProps>()(UserInfo);
