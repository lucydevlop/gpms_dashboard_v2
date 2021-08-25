import React, { BaseSyntheticEvent, PureComponent } from 'react';
import PageWrapper from '@components/PageWrapper';
import { Button, Card, Col, Row } from 'antd';
import { VisitorRegisterDateFields } from '@views/Visitor/fields/visitor';
import { Form } from '@ant-design/compatible';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { PlusCircleOutlined } from '@ant-design/icons';
import { IVisitorObj } from '@models/visitor';
import { EDelYn, ETicketType } from '@/constants/list';
import VisitorRegisterCardForm from '@views/Visitor/Register/registerCard';
import { getFormFields } from '@utils/form';
import { conversionDateTime } from '@utils/conversion';
import { VisitorAdds } from '@api/visitor';
import { runInAction } from 'mobx';
import { inject, observer } from 'mobx-react';
import { userStore } from '@store/userStore';
import zdsTips from '@utils/tips';

interface IProps extends FormComponentProps {}
interface IState {
  detailModal: false;
  createModal: false;
  loading: boolean;
  visitorCardList: IVisitorObj[];
}
@inject('userStore')
@observer
class VisitorRegister extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: true,
      createModal: false,
      detailModal: false,
      visitorCardList: [
        {
          effectDate: new Date(),
          vehicleNo: '',
          memo: '',
          delYn: EDelYn.N,
          ticketType: ETicketType.VISITTICKET
        }
      ]
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  handleSubmit() {
    let flag = true;
    const { userInfo } = userStore;
    this.props.form.validateFields((err, fieldsValue) => {
      fieldsValue.effectDate = conversionDateTime(fieldsValue.effectDate, '{y}-{m}-{d} 00:00:00');
      fieldsValue.expireDate = conversionDateTime(fieldsValue.effectDate, '{y}-{m}-{d} 23:59:59');
      this.state.visitorCardList.forEach((e) => {
        if (e.vehicleNo === '' || e.vehicleNo === undefined || e.vehicleNo === null) {
          zdsTips.error('필수값 확인');
          flag = false;
        }
        e.effectDate = fieldsValue.effectDate;
        e.expireDate = fieldsValue.expireDate;
        e.corpSn = userInfo.corpSn;
      });
      if (!flag) {
        return;
      }
      VisitorAdds(this.state.visitorCardList).then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            this.setState(
              {
                visitorCardList: []
              },
              () => {
                zdsTips.success('방문권 등록 완료'), this.renderVisitorRegisterCard();
              }
            );
          });
        }
      });
    });
  }

  handleDeleteVisitorCard = (item: number) => {
    this.setState(
      {
        visitorCardList: this.state.visitorCardList.filter((e) => {
          return item !== e.index;
        })
      },
      () => this.renderVisitorRegisterCard()
    );
  };

  renderVisitorRegisterCard() {
    if (this.state.visitorCardList.length === 0) {
      this.setState({
        visitorCardList: [
          {
            effectDate: new Date(),
            vehicleNo: '',
            memo: '',
            delYn: EDelYn.N,
            ticketType: ETicketType.VISITTICKET
          }
        ]
      });
    }
    const result = this.state.visitorCardList.map((I, index) => {
      this.state.visitorCardList[index].index = index;
      return (
        <VisitorRegisterCardForm
          key={index}
          index={index}
          handleDeleteVisitorCard={(index) => this.handleDeleteVisitorCard(index)}
          handleValue={(value: IVisitorObj, index: number) => this.handleValue(value, index)}
          visitor={I}
          length={this.state.visitorCardList.length}
        />
      );
    });
    return <>{result}</>;
  }

  handleValue(value: IVisitorObj, index: number) {
    const updateData = {
      effectDate: new Date(),
      vehicleNo: value.vehicleNo,
      index: index,
      etc: value.etc,
      tel: value.tel,
      delYn: EDelYn.N,
      ticketType: ETicketType.VISITTICKET
    };

    const list = this.state.visitorCardList.map((e: IVisitorObj) => {
      if (e.index === index) {
        return { ...updateData };
      } else {
        return { ...e };
      }
    });

    this.setState({ visitorCardList: list });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const visitorDateFieldsConfig = VisitorRegisterDateFields();
    return (
      <PageWrapper>
        <Row gutter={24} style={{ justifyContent: 'center' }}>
          <Col xl={8} lg={12} md={24} sm={24} xs={24}>
            <Form
              className="action-error-modal-form"
              onSubmit={(e: BaseSyntheticEvent) => {
                e.preventDefault();
                this.handleSubmit();
              }}
            >
              <Form.Item>
                <Card
                  title="방문권 등록"
                  type="inner"
                  headStyle={{ fontSize: 18, fontWeight: 700 }}
                  size="default"
                  bordered={false}
                  extra={
                    <div>
                      <a
                        onClick={(e: any) => {
                          e.stopPropagation();
                          this.setState({
                            visitorCardList: [
                              ...this.state.visitorCardList,
                              { effectDate: new Date(), vehicleNo: '', memo: '', delYn: EDelYn.N }
                            ]
                          });
                        }}
                      >
                        <PlusCircleOutlined />
                      </a>
                    </div>
                  }
                  hoverable
                >
                  <Row gutter={24}>
                    {getFormFields(getFieldDecorator, visitorDateFieldsConfig, true, 1)}
                  </Row>
                  {this.renderVisitorRegisterCard()}
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginTop: '15px', width: '20%', left: '40%' }}
                  >
                    등록
                  </Button>
                </Card>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </PageWrapper>
    );
  }
}

const VisitorRegisterForm = Form.create<IProps>()(VisitorRegister);
export default VisitorRegisterForm;
