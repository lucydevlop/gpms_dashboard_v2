import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Image, Row, Select } from 'antd';
import { IInoutPaymentObj } from '@models/inoutPayment';
import { IFacilityObj } from '@models/facility';
import { parkinglotStore } from '@store/parkinglotStore';
import { printReceiptInoutPayment } from '@api/Inout';
import zdsTips from '@utils/tips';
import { EDelYn } from '@/constants/list';

interface IProps {
  payment: IInoutPaymentObj;
}

interface IState {
  payStations: IFacilityObj[];
  facilityId: String;
}

@inject('parkinglotStore', 'localeStore')
@observer
class ReceiptModal extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      payStations: parkinglotStore.getPayStations,
      facilityId: ''
    };
  }

  handleRePrint = () => {
    if (this.state.facilityId === '') {
      zdsTips.error('영수증 출력 정산기를 선택하세요');
    } else {
      printReceiptInoutPayment(this.props.payment.sn, this.state.facilityId)
        .then()
        .catch(() => zdsTips.error('영수증 출력에 실패하였습니다'));
    }
  };

  renderSelect = () => {
    const { Option } = Select;
    return (
      <Select
        style={{ width: '150px' }}
        onChange={(value: any) => this.setState({ facilityId: value })}
      >
        {this.state.payStations
          .filter((p) => p.delYn === EDelYn.N)
          .map((p) => (
            <Option value={p.dtFacilitiesId}>{p.fname}</Option>
          ))}
      </Select>
    );
  };

  render() {
    return (
      <>
        <Row style={{ justifyContent: 'center' }}>
          <Image alt={this.props.payment.vehicleNo} src={this.props.payment.receiptImage} />
        </Row>
        <Row style={{ justifyContent: 'center', marginTop: '15px' }}>
          {this.renderSelect()}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              this.handleRePrint();
            }}
          >
            정산기출력
          </Button>
        </Row>
      </>
    );
  }
}

export default ReceiptModal;
