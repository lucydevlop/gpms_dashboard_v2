import React, { BaseSyntheticEvent, PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { FormComponentProps } from '@ant-design/compatible/lib/form';
import { Form } from '@ant-design/compatible';
import { ITicketObj } from '@models/ticket';
import { Button, Card, Col, Row } from 'antd';
import { getFormFields } from '@utils/form';
import { conversionDateTime } from '@/utils/conversion';
import { IInoutObj } from '@/models/inout';
import { newInoutDetailFileds } from '../FormFields/FormFields';
import Meta from 'antd/lib/card/Meta';
import { EInoutType } from '@/constants/list';
import emptyImage from '@views/Dashboard/images/empty.svg';

interface IInoutDetailModalProps extends FormComponentProps {
  inout: IInoutObj;
  gates: any[];
  onSubmit: (inout: IInoutObj) => void;
}
interface IInoutDetailModalProps {}
@inject('localeStore')
@observer
class InoutDetailModal extends PureComponent<IInoutDetailModalProps, IInoutDetailModalProps> {
  handlerSubmit() {
    this.props.form.validateFields((err, fieldsValue) => {
      fieldsValue.inDate = conversionDateTime(fieldsValue.inDate);
      fieldsValue.outDate
        ? ((fieldsValue.outDate = conversionDateTime(fieldsValue.outDate)),
          (fieldsValue.type = EInoutType.OUT))
        : (fieldsValue.type = EInoutType.IN);
      if (!err) this.props.onSubmit(fieldsValue);
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const inoutDetailFields = newInoutDetailFileds(this.props.inout, this.props.gates);
    return (
      <>
        <Row style={{ marginTop: '10px' }}>
          <Form
            onSubmit={(e: BaseSyntheticEvent) => {
              e.preventDefault();
              this.handlerSubmit();
            }}
          >
            <Row gutter={24}>{getFormFields(getFieldDecorator, inoutDetailFields, true, 8)}</Row>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: '10px', width: '20%', left: '40%', marginBottom: '10px' }}
            >
              등록
            </Button>
            <Row gutter={24} className="rowInfo-card">
              <Col xs={24} sm={12} md={12} lg={12}>
                <Card
                  hoverable
                  style={{ padding: 20, marginBottom: 20 }}
                  cover={
                    <img
                      alt={this.props.inout.vehicleNo}
                      // @ts-ignore
                      src={
                        this.props.inout.inImgBase64Str
                          ? `${this.props.inout.inImgBase64Str}`
                          : emptyImage
                      }
                    />
                  }
                >
                  <Meta title={'입차사진'} />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <Card
                  hoverable
                  style={{ padding: 20, marginBottom: 20 }}
                  cover={
                    <img
                      alt={this.props.inout.vehicleNo}
                      // @ts-ignore
                      src={
                        this.props.inout.outImgBase64Str
                          ? `${this.props.inout.outImgBase64Str}`
                          : emptyImage
                      }
                    />
                  }
                >
                  <Meta title={'출차사진'} />
                </Card>
              </Col>
            </Row>
          </Form>
        </Row>
      </>
    );
  }
}

const InoutDetailModalForm = Form.create<IInoutDetailModalProps>({ name: 'inoutDetailModal' })(
  InoutDetailModal
);

export default InoutDetailModalForm;
