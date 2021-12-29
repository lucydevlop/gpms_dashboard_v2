import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Image, Row } from 'antd';
import { IInoutPaymentObj } from '@models/inoutPayment';

interface IProps {
  payment: IInoutPaymentObj;
}

interface IState {}

@inject('parkinglotStore', 'localeStore')
@observer
class ReceiptModal extends PureComponent<IProps, IState> {
  render() {
    return (
      <>
        <Row>
          <Image alt={this.props.payment.vehicleNo} src={this.props.payment.receiptImage} />
        </Row>
        <Row>
          <Button>영수증재출력</Button>
          <Button>정산기재출력</Button>
        </Row>
      </>
    );
  }
}

export default ReceiptModal;
